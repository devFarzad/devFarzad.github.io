import { getRepositories, extractSkillsFromRepositories } from '@/lib/github';
import { motion } from 'framer-motion';

export async function Skills() {
  const repositories = await getRepositories();
  const skills = extractSkillsFromRepositories(repositories);
  
  // Group skills into categories
  const skillCategories = {
    'Languages': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'PHP', 'Ruby', 'Swift', 'Go', 'Rust', 'C#', 'Kotlin'],
    'Frontend': ['React', 'Vue', 'Angular', 'Next.js', 'Svelte', 'HTML', 'CSS', 'SASS', 'LESS', 'Tailwind CSS', 'Bootstrap', 'Material UI'],
    'Backend': ['Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'FastAPI'],
    'Database': ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'SQLite', 'Firebase', 'DynamoDB', 'Supabase', 'Elasticsearch'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'GitHub Actions', 'CircleCI', 'Jenkins', 'Terraform'],
    'Mobile': ['React Native', 'Flutter', 'Android', 'iOS', 'Ionic', 'Xamarin'],
    'Other': ['GraphQL', 'REST API', 'WebSockets', 'OAuth', 'JWT', 'Microservices', 'Serverless', 'Testing', 'CI/CD'],
  };
  
  // Organize skills into their categories
  const organizedSkills = Object.entries(skillCategories).map(([category, categorySkills]) => {
    const matchedSkills = skills.filter(skill => 
      categorySkills.some(categorySkill => 
        categorySkill.toLowerCase() === skill.toLowerCase()
      )
    );
    
    return {
      category,
      skills: matchedSkills,
    };
  }).filter(category => category.skills.length > 0);
  
  // Add any remaining skills to "Other" category
  const categorizedSkills = organizedSkills.flatMap(category => category.skills);
  const uncategorizedSkills = skills.filter(skill => 
    !categorizedSkills.some(categorizedSkill => 
      categorizedSkill.toLowerCase() === skill.toLowerCase()
    )
  );
  
  if (uncategorizedSkills.length > 0) {
    const otherCategory = organizedSkills.find(category => category.category === 'Other');
    if (otherCategory) {
      otherCategory.skills = [...otherCategory.skills, ...uncategorizedSkills];
    } else {
      organizedSkills.push({
        category: 'Other',
        skills: uncategorizedSkills,
      });
    }
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
          {organizedSkills.map((category, index) => (
            <div key={category.category} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
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