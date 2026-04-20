"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "Plataforma de comercio electronico completa con carrito de compras, pagos integrados y panel de administracion.",
    image: "/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Task Management App",
    description:
      "Aplicacion de gestion de tareas con funcionalidades de colaboracion en tiempo real y notificaciones.",
    image: "/projects/taskapp.jpg",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Social Media Dashboard",
    description:
      "Dashboard de analiticas para redes sociales con graficos interactivos y reportes automatizados.",
    image: "/projects/dashboard.jpg",
    technologies: ["Vue.js", "Python", "FastAPI", "Redis"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "AI Chat Application",
    description:
      "Chatbot inteligente con procesamiento de lenguaje natural e integracion con multiples plataformas.",
    image: "/projects/chatbot.jpg",
    technologies: ["React", "OpenAI", "Express", "WebSocket"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Fitness Tracker",
    description:
      "Aplicacion de seguimiento de fitness con planes de entrenamiento personalizados y estadisticas.",
    image: "/projects/fitness.jpg",
    technologies: ["React Native", "Firebase", "Node.js", "Charts"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Portfolio Generator",
    description:
      "Herramienta para crear portfolios profesionales con plantillas personalizables y exportacion.",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "Tailwind", "Vercel", "MDX"],
    demoUrl: "#",
    codeUrl: "#",
  },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              Mis Proyectos
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Una seleccion de proyectos que demuestran mi experiencia en 
            desarrollo web y mi pasion por crear soluciones innovadoras.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl blur opacity-0 group-hover:opacity-30 transition-all duration-500" />
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Layers className="w-16 h-16 text-primary/50" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                    <a
                      href={project.codeUrl}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg font-medium text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Codigo
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
