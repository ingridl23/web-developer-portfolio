"use client";

import { supabase } from "@/lib/supabaseClient";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const categories = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "database", label: "Bases de Datos" },
  { id: "tools", label: "Herramientas" },
];

interface Technology {
  id: number;
  name: string;
  image_url: string;
  type: string;
}

export function Technologies() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      const { data, error } = await supabase
        .from("technologies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
      } else {
        setTechnologies(data || []);
      }
    };

    fetchTechnologies();
  }, []);

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
              Tecnologías
            </span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full" />

          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Mi stack tecnológico incluye herramientas modernas y eficientes
            para crear aplicaciones de alta calidad.
          </p>
        </motion.div>

        <div className="space-y-14">
          {categories.map((category, catIndex) => (
            <motion.div key={category.id}>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                {category.label}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {technologies
                  .filter((tech) => tech.type === category.id)
                  .map((tech, index) => (
                    <motion.div
                      key={tech.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.4,
                        delay: catIndex * 0.1 + index * 0.05,
                      }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="group"
                    >
                      <div className="flex flex-col items-center gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300">
                        <img
                          src={tech.image_url}
                          alt={tech.name}
                          className="w-12 h-12 object-contain"
                        />

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
      </div>
    </section>
  );
}