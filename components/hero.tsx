"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Sparkles } from "lucide-react";
import { TypewriterText } from "./typewriter-text";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-20"
    >
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Disponible para proyectos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-sans"
        >
          <span className="text-foreground">Hola, soy </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-glow-primary">
            Ingrid
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-medium flex items-center justify-center gap-3">
            <Code2 className="w-8 h-8 text-secondary" />
            <TypewriterText
              texts={[
                "Desarrolladora Full Stack",
                "Frontend Developer",
                "Backend Developer",
                "UI/UX Enthusiast",
              ]}
              className="text-foreground"
            />
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Transformo ideas en experiencias digitales extraordinarias. 
          Especializada en crear aplicaciones web modernas, escalables y con 
          interfaces que cautivan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-105 glow-primary"
          >
            <span className="relative z-10">Ver Proyectos</span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-4 border-2 border-primary rounded-full font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:glow-primary"
          >
            Contactarme
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
