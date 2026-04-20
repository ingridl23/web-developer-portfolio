"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { name: "JavaScript", color: "#F7DF1E", category: "frontend" },
  { name: "TypeScript", color: "#3178C6", category: "frontend" },
  { name: "React", color: "#61DAFB", category: "frontend" },
  { name: "Next.js", color: "#ffffff", category: "frontend" },
  { name: "Vue.js", color: "#4FC08D", category: "frontend" },
  { name: "Tailwind CSS", color: "#06B6D4", category: "frontend" },
  { name: "Node.js", color: "#339933", category: "backend" },
  { name: "Express", color: "#ffffff", category: "backend" },
  { name: "Laravel", color: "#FF2D20", category: "backend" },
  { name: "Python", color: "#3776AB", category: "backend" },
  { name: "PHP", color: "#777BB4", category: "backend" },
  { name: "MySQL", color: "#4479A1", category: "database" },
  { name: "PostgreSQL", color: "#4169E1", category: "database" },
  { name: "MongoDB", color: "#47A248", category: "database" },
  { name: "Redis", color: "#DC382D", category: "database" },
  { name: "Git", color: "#F05032", category: "tools" },
  { name: "Docker", color: "#2496ED", category: "tools" },
  { name: "AWS", color: "#FF9900", category: "tools" },
];

const categories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Bases de Datos" },
  { id: "tools", label: "Herramientas" },
];

export function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="technologies" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              Tecnologias
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Mi stack tecnologico incluye las herramientas mas modernas y 
            eficientes para crear aplicaciones de alta calidad.
          </p>
        </motion.div>

        {categories.map((category, catIndex) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
              {category.label}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {technologies
                .filter((tech) => tech.category === category.id)
                .map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: catIndex * 0.1 + index * 0.05,
                    }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group relative"
                  >
                    <div
                      className="absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                      style={{ backgroundColor: tech.color }}
                    />
                    <div className="relative flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold"
                        style={{
                          backgroundColor: `${tech.color}20`,
                          color: tech.color,
                        }}
                      >
                        {tech.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-foreground text-center">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
