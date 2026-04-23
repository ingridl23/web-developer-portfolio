"use client";

import { motion, useInView } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";
import { useRef } from "react";

const highlights = [
  {
    icon: Rocket,
    title: "Desarrollo Full Stack",
    description: "Creo aplicaciones completas desde el frontend hasta el backend.",
  },
  {
    icon: Target,
    title: "Enfoque en UX",
    description: "Diseno interfaces intuitivas y experiencias memorables.",
  },
  {
    icon: Zap,
    title: "Productividad Aumentada Con IA",
    description: "Apalancamiento mediante las nuevas tecnologias en automatizacion y produccion en tecnologia.",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Sobre Mi
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Soy una desarrolladora Full Stack apasionada por crear 
                  soluciones digitales innovadoras y modernas.Combinando desarrollo web con inteligencia artificial y automatización de procesos. 
      Me especializo en transformar ideas complejas en aplicaciones funcionales, escalables 
      y alineadas a las necesidades reales de cada negocio.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                   Mi enfoque está orientado a la implementación de nuevas tecnologías como IA aplicada, 
      automatizaciones y herramientas cloud, utilizando soluciones como Supabase,Vercel,V0, Copilot, 
      Codex, Ollama, n8n, entre otras. Busco optimizar flujos de trabajo, reducir tareas 
      repetitivas y potenciar la eficiencia tanto en empresas grandes como en proyectos más pequeños.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Creo firmemente en el impacto de la innovación tecnológica como motor de crecimiento. 
      Por eso, me mantengo en constante aprendizaje, explorando nuevas herramientas y 
      desarrollando soluciones que no solo funcionen bien, sino que aporten valor real 
      y diferencial en cada proyecto.
                </p>
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group flex gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:glow-primary"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
