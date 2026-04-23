"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm text-center md:text-left">
            2026 Tec.Ledesma Ingrid. Todos los derechos reservados.
          </p>

 

          <p className="text-muted-foreground text-sm flex items-center gap-2">
        
            <Link
              href="/admin/login"
              className="text-muted-foreground hover:text-muted-foreground/80 transition-colors cursor-default"
              aria-label="codigo"
            >
              iniciar sesion 
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
