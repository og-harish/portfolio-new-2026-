import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  app.use(express.json());

  // Contact API Endpoint
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message, project } = req.body;

    if (!resend) {
      console.log("--- MOCK EMAIL DATA ---");
      console.log(`From: ${name} <${email}>`);
      console.log(`To: harish.og.official@gmail.com`);
      console.log(`Subject: ${subject || "New Inquiry"}`);
      console.log(`Message: ${message}`);
      console.log("------------------------");
      console.warn("RESEND_API_KEY is not set. The message was logged to the console but not sent via email.");
      
      // We return success but with a notice in dev mode
      return res.status(200).json({ 
        status: "mock_success", 
        message: "Development Mode: Your message was logged successfully, but no email was sent because RESEND_API_KEY is missing." 
      });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["harish.og.official@gmail.com"],
        subject: subject || `New Inquiry from ${name} (Portfolio)`,
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${project ? `<p><strong>Project Type:</strong> ${project}</p>` : ""}
          <p><strong>Subject:</strong> ${subject || "Inquiry"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      if (error) {
        console.error("Resend Error:", error);
        let hint = "Failed to send email. Check your Resend API Key and verified domain.";
        if (error.message.includes("verified")) {
          hint = "The 'from' address must be verified in your Resend account. For testing, use the account owner's email as the 'to' address.";
        }
        return res.status(400).json({ 
          error: error.message || hint 
        });
      }

      res.status(200).json({ status: "ok", data });
    } catch (err) {
      console.error("Server-side Email Error:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: 3000 },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
