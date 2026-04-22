import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustStrip from "./components/TrustStrip";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Services from "./components/Services";
import AILab from "./components/AILab";
import ResumeCTA from "./components/ResumeCTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import LoadingScreen from "./components/LoadingScreen";
import CursorGlow from "./components/CursorGlow";

export default function App() {
  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="relative selection:bg-brand-blue selection:text-white">
      <LoadingScreen />
      <CursorGlow />
      
      {/* Background Atmospheric Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <AILab />
          <Services />
          <ResumeCTA />
          <Contact />
        </main>
        <Footer />
        <ChatBot />
      </div>
    </div>
  );
}
