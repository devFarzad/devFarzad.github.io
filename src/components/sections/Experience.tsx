'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Experience() {
  return (
    <section id="experience" className="py-16">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8">Work Experience</h2>
          
          <div className="relative border-l-2 border-blue-500 pl-8 ml-4">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-10 relative"
              >
                <div className="absolute -left-10 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900" />
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{experience.role}</h3>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {experience.period}
                    </span>
                  </div>
                  
                  <div className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {experience.company}
                  </div>
                  
                  <p className="mb-4">
                    {experience.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Download Full CV
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const experiences = [
  {
    role: 'Senior Software Engineer',
    company: 'DataCode App',
    period: '2022 - Present',
    description: 'Leading the development of robust web applications, implementing scalable architectures and mentoring junior developers. Worked on enterprise-level projects focusing on performance optimization and best practices.',
    skills: ['Next.js', 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    role: 'Full-stack Developer',
    company: 'Tech Innovations',
    period: '2020 - 2022',
    description: 'Developed and maintained full-stack applications, focusing on responsive UI, API development, and database design. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    skills: ['React', 'JavaScript', 'Express.js', 'MongoDB', 'GraphQL', 'Firebase'],
  },
  {
    role: 'Frontend Developer',
    company: 'Web Solutions',
    period: '2018 - 2020',
    description: 'Created responsive and user-friendly interfaces for various clients, following modern design principles and accessibility standards. Implemented complex UI components and animations.',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Sass', 'UI/UX Design'],
  },
]; 