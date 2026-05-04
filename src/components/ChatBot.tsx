import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, ACHIEVEMENTS } from "../constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "bot";
  content: string;
};

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Harish V's portfolio. 
Harish V is a Data Analytics and Machine Learning Engineer.
He is currently pursuing BCA at Hindustan College of Arts & Science.

Here is his profile information:
- Name: ${PERSONAL_INFO.name}
- Title: ${PERSONAL_INFO.title}
- Location: ${PERSONAL_INFO.location}
- Summary: ${PERSONAL_INFO.summary}
- Skills: 
  - Frontend: ${SKILLS.frontend.join(", ")}
  - Backend: ${SKILLS.backend.join(", ")}
  - AI & ML: ${SKILLS.aiPlatforms.join(", ")}
  - Tools: ${SKILLS.tools.join(", ")}
  - Creative: ${SKILLS.creative.join(", ")}
- Experience: ${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.duration})`).join("; ")}
- Projects: ${PROJECTS.map(p => p.title).join(", ")}
- Education: ${EDUCATION.map(e => `${e.degree} from ${e.institution}`).join("; ")}
- Achievements: ${ACHIEVEMENTS.map(a => a.title).join(", ")}

Your goal is to answer questions about Harish professionally and enthusiastically. 
If someone asks about his skills or work, focus on his identity as a Data Analytics and Machine Learning Engineer.
Always be polite and helpful. Mention his interest in AI and ML.
If asked about contact info, mention his email: ${PERSONAL_INFO.email}.
Keep responses concise and friendly.
`;

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Harish's AI assistant. Ask me anything about his work, skills, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const botResponse = response.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: "bot", content: "I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:bg-blue-500 transition-colors"
      >
        {isOpen ? <X className="w-8 h-8" /> : <MessageSquare className="w-8 h-8" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[500px] bg-neutral-900 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden glass"
          >
            {/* Header */}
            <div className="p-6 bg-white/5 border-b border-white/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white leading-none">Harish's AI Assistant</h3>
                <span className="text-[10px] text-green-500 flex items-center gap-1 mt-1 font-mono uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide bg-neutral-900/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex w-full gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === "user" ? "bg-blue-600/20 text-blue-400" : "bg-white/10 text-brand-purple"
                  }`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm break-words whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20" 
                      : "bg-white/5 text-gray-200 border border-white/10 rounded-tl-none shadow-sm"
                  }`}>
                    {msg.role === "bot" ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:p-2 prose-pre:rounded-lg">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.content
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-brand-purple flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 text-gray-300 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                    <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
                    <span className="text-[10px] font-medium tracking-wide uppercase">Assistant is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  aria-label="Chat input"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors pr-12"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-400 hover:text-blue-300 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
