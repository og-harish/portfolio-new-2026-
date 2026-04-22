import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function CursorGlow() {
  const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 100);
      mouseY.set(e.clientY - 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none z-[9999] hidden lg:block"
    />
  );
}
