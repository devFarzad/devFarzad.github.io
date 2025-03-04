import { getRepositories, extractSkillsFromRepositories } from '@/lib/github';
import { motion } from 'framer-motion';

// Define a type for skill categories
type SkillCategory = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools';
type SkillCategoriesMap = Record<SkillCategory, string[]>;

// Fallback skills data
const fallbackSkillCategories: SkillCategoriesMap = {
  'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'PHP'],
  'Frontend': ['React', 'Vue', 'Angular', 'Next.js', 'HTML', 'CSS', 'SASS', 'Tailwind CSS'],
  'Backend': ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'ASP.NET'],
  'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'],
  'DevOps': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'CI/CD', 'Git'],
  'Tools': ['VSCode', 'Webpack', 'Vite', 'Jest', 'Testing Library', 'Figma']
};

export async function Skills() {
  // Fetch repositories and extract skills, with error handling
  let skillCategories: SkillCategoriesMap = fallbackSkillCategories;
  
  try {
    const repositories = await getRepositories();
    if (repositories.length > 0) {
      const skills = extractSkillsFromRepositories(repositories);
      
      // Group skills into categories
      skillCategories = {
        'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'PHP', 'Ruby', 'Swift', 'Go', 'Rust', 'C#', 'Kotlin'].filter(lang => 
          skills.includes(lang)
        ),
        'Frontend': ['React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material UI'].filter(tech => 
          skills.includes(tech)
        ),
        'Backend': ['Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'ASP.NET', 'Laravel', 'Ruby on Rails', 'GraphQL', 'REST API'].filter(tech => 
          skills.includes(tech)
        ),
        'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Firebase', 'DynamoDB', 'Oracle', 'Cassandra'].filter(db => 
          skills.includes(db)
        ),
        'DevOps': ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'CI/CD', 'Jenkins', 'GitHub Actions', 'GitLab CI', 'Terraform'].filter(tool => 
          skills.includes(tool)
        ),
        'Tools': ['VSCode', 'Git', 'Webpack', 'Vite', 'Babel', 'Jest', 'Mocha', 'Chai', 'Cypress', 'Selenium', 'Figma', 'Photoshop'].filter(tool => 
          skills.includes(tool)
        )
      };
      
      // If any category is empty after filtering, fall back to predefined skills
      Object.keys(skillCategories).forEach((category) => {
        const key = category as SkillCategory;
        if (skillCategories[key].length === 0) {
          skillCategories[key] = fallbackSkillCategories[key];
        }
      });
    }
  } catch (error) {
    console.error('Error in Skills component:', error);
    // Using fallback data (already initialized)
  }
  
  return (
    <section id="skills" className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container px-4 mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <p className="text-lg mb-8 max-w-2xl">
          My technical skills are automatically inferred from my GitHub repositories. These skills represent technologies I use regularly in my projects.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skillCategories).map(([category, skills], index) => (
            <div key={category} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: skillIndex * 0.05 + index * 0.1,
                    }}
                  >
                    <span className="px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium text-sm">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
} 