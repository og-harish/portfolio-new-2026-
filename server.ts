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
      console.warn("RESEND_API_KEY is not set. Email will not be sent.");
      return res.status(500).json({ error: "Email service not configured. Please set RESEND_API_KEY in .env" });
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
        return res.status(400).json({ error });
      }

      res.status(200).json({ status: "ok", data });
    } catch (err) {
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
