'use client'
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { ParticlesBackground } from "@/components/particles-background";
import { Projects } from "@/components/projects";
import { SocialLinks } from "@/components/social-links";
import { Technologies } from "@/components/technologies";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


export default  function Home() {
  
  type Project = {
    id: string;
    title: string;
    description: string;
    image?: string;
  };
 
const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("projects").select("*") as { data: Project[] | null };
      setProjects(data || []);
    };

    fetchData();
  }, []);


  return (
    <div className="relative min-h-screen animated-gradient">
      <ParticlesBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Technologies />
        <Contact />
        <SocialLinks />
      </main>
      <Footer />
    </div>
  );
}



/**NEXT_PUBLIC_SUPABASE_URL=https://lausvlsprpvotypmejom.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_zXMBOIcdCoJ23AKmcEa_jA_eE3DLc1f
instalar npm  localmente cuando abra el proyecto en mi compu */
