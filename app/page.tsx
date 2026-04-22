
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { ParticlesBackground } from "@/components/particles-background";
import { Projects } from "@/components/projects";
import { SocialLinks } from "@/components/social-links";
import { Technologies } from "@/components/technologies";
import { supabase } from './lib/supabaseClient';


export default async function Home() {
  const { data, error } = await supabase
.from('projects')
.select('*');
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(data, error);




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
