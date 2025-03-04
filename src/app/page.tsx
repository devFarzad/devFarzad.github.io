import { Hero } from '@/components/sections/Hero';
import { AboutWrapper } from '@/components/sections/AboutWrapper';
import { ProjectsWrapper } from '@/components/sections/ProjectsWrapper';
import { SkillsWrapper } from '@/components/sections/SkillsWrapper';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutWrapper />
      <ProjectsWrapper />
      <SkillsWrapper />
      <Experience />
      <Contact />
    </main>
  );
}
