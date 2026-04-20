import { Navigation } from "@/components/navigation";
import { ParticlesBackground } from "@/components/particles-background";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Projects } from "@/components/projects";
import { Technologies } from "@/components/technologies";
import { Contact } from "@/components/contact";
import { SocialLinks } from "@/components/social-links";
import { Footer } from "@/components/footer";

export default function Home() {
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
