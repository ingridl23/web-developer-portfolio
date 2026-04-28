"use client";

import { supabase } from "@/lib/supabaseClient";
import { motion, useInView } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log("ERROR FETCH:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

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
            Mis Proyectos
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="group relative"
            >
              <div className="relative bg-card border border-border rounded-2xl overflow-hidden">
                
                {/* Imagen */}
                <div className="h-48">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Botones */}
                  <div className="flex gap-4">
                    <a
                      href={project.demo_url}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>

                    <a
                      href={project.github_url}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm"
                    >
                      <Code2 className="w-4 h-4" />
                      Código
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
/**
 * En React:

array.map(item => JSX)

 es lo que transforma datos → UI

Sin eso:

no hay render dinámico
no hay datos reales
 */