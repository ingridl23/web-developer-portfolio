"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/ingridl23",
    color: "#ffffff",
    hoverGlow: "rgba(255, 255, 255, 0.5)",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/",
    color: "#0A66C2",
    hoverGlow: "rgba(10, 102, 194, 0.5)",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/",
    color: "#1DA1F2",
    hoverGlow: "rgba(29, 161, 242, 0.5)",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:contacto@ingrid.dev",
    color: "#EC4899",
    hoverGlow: "rgba(236, 72, 153, 0.5)",
  },
];

export function SocialLinks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 px-4" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h3 className="text-xl font-semibold text-muted-foreground mb-8">
          Conecta conmigo
        </h3>
        <div className="flex items-center justify-center gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.1 }}
              className="group relative"
              aria-label={link.name}
            >
              <div
                className="absolute -inset-3 rounded-xl blur-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                style={{ backgroundColor: link.hoverGlow }}
              />
              <div
                className="relative w-14 h-14 flex items-center justify-center rounded-xl bg-card border border-border group-hover:border-transparent transition-all duration-300"
                style={
                  {
                    "--hover-color": link.color,
                  } as React.CSSProperties
                }
              >
                <link.icon
                  className="w-6 h-6 text-muted-foreground group-hover:text-[var(--hover-color)] transition-colors duration-300"
                  style={
                    {
                      "--hover-color": link.color,
                    } as React.CSSProperties
                  }
                />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
