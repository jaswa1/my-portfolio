import Navbar from '@/app/components/Navbar';
import HeroSimple from '@/app/components/HeroSimple';
import Skills from '@/app/components/Skills';
import Projects from '@/app/components/Projects';
import Contact from '@/app/components/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSimple />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
