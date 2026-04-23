"use client";

import { motion, useInView } from "framer-motion";
import { Code2, ExternalLink, Layers } from "lucide-react";
import { useRef } from "react";

const projects = [

  {
    title: "CISNe - Consultorios Interdiciplinarios",
    description:
      "sistema web integral diseñado para la gestión y difusión de servicios profesionales dentro de un entorno de consultorios. La plataforma combina un sitio público informativo con un panel administrativo, permitiendo centralizar la información institucional, mejorar la comunicación con los usuarios y optimizar la gestión interna. El sistema está orientado a brindar una experiencia clara y accesible tanto para pacientes como para profesionales, facilitando el acceso a información relevante sobre servicios, especialistas y novedades.",
    image: "/projects/cisne.jpg",
    technologies: ["PHP", "JS", "SQL", "Cloudinary","Laravel","Bootstrap","TailwindCss","Vite"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Sitio Web Oficina De Empleo Y Emprendedurismo ",
    description:
      "Sitio web para la oficina de Empleo y Emprendedurismo pertenenciente al municipio de Tres Arroyos, Provincia De Buenos Aires. El sistema tiene como finalidad visibilizar, registrar y gestionar los emprendimientos locales y las propuestas de capacitación para la comunidad",
    image: "/projects/empleo.jpg",
    technologies: ["PHP","JS", "SQL", "Laravel","Cloudinary","TailwindCss","Bootstrap"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "App Web Gestion Guardavidas",
    description:
      "Este proyecto consiste en una plataforma web de gestión para guardavidas, cuyo objetivo principal es registrar, organizar y consultar los diferentes acontecimientos que ocurren durante el desarrollo de sus tareas en las playas bajo su supervisión.",
    image: "/projects/guardavidas.jpg",
    technologies: ["PHP", "JS", "Laravel", "SQL","TailwindCss","Vite"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "App Web Gestion Vehicular",
    description:
      "La municipalidad de Tres Arroyos cuenta con una flota de vehiculos limitada que debe ser compartida entre distintas areas y entes municipales. El presente proyecto propone el desarrollo de un sistema informatico web para organizar,controlar y optimizar el uso de dichos vehiculos.",
    image: "/projects/chatbot.jpg",
    technologies: ["PHP", "JS", "Laravel", "Cloudinary","TailwindCss","Vite"],
    demoUrl: "#",
    codeUrl: "#",
  },

   
  {
    title: "App De Entrenamiento Y Nutricion",
    description:
      "Aplicacion administrativa y de bienestar para entrenadores y deportistas que obtienen planes de vigencia online y que ponen en practica de manera remota o presencial en un establecimiento de entrenamiento.",
    image: "/projects/fitness.jpg",
    technologies: ["React Native", "SQL", "Node.js", "Vite","TailwindCss","Cloudinary"],
    demoUrl: "#",
    codeUrl: "#",
  },

 {
    title: "App Web Gestor De Turnos En Restaurantes",
    description:
      "  ",
    image: "/projects/restaurants.jpg",
    technologies: ["React Native", "Java","SpringBoot","Spring Security", "Node.js", "TailwindCss"],
    demoUrl: "#",
    codeUrl: "#",
  },


  {
    title: "App De Presencia Emprendedora",
    description:
      "Aplicacion de seguimiento de emprendedores y empresas pequeñas que ofrecen uno o varios servicios de diferentes areas",
    image: "/projects/emprender.jpg",
    technologies: ["React Native", "Java","SpringBoot","Spring Security", "Node.js", "TailwindCss"],
    demoUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Developer Portfolio",
    description:
      "ESte mismo portfolio web",
    image: "/projects/portfolio.jpg",
    technologies: ["TS", "Tailwind", "Vercel","Auth0", "Supabase","Vite"],
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
                      <Code2 className="w-4 h-4" />
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
