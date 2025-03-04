import { getPinnedRepositories, getLanguagesForRepo, formatUpdatedAt, Repository, Language } from '@/lib/github';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export async function Projects() {
  const repositories = await getPinnedRepositories();
  
  // Fetch languages for each repository
  const reposWithLanguages = await Promise.all(
    repositories.map(async (repo) => {
      const languages = await getLanguagesForRepo(repo.name);
      return { ...repo, languages };
    })
  );
  
  return (
    <section id="projects" className="py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container px-4 mx-auto"
      >
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <p className="text-lg mb-8 max-w-2xl">
          A selection of my recent work and personal projects. These repositories are automatically updated from my GitHub profile.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reposWithLanguages.map((repo) => (
            <ProjectCard key={repo.id} repository={repo} languages={repo.languages} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="https://github.com/devFarzad?tab=repositories" target="_blank" rel="noopener noreferrer">
              View All Projects
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

interface ProjectCardProps {
  repository: Repository;
  languages: Language[];
}

function ProjectCard({ repository, languages }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col overflow-hidden">
        <div className="p-6 flex-1">
          <h3 className="text-xl font-semibold mb-2">{repository.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Updated {formatUpdatedAt(repository.updated_at)}
          </p>
          <p className="mb-4 text-sm line-clamp-3">
            {repository.description || 'No description provided'}
          </p>
          
          {languages.length > 0 && (
            <div className="mb-4">
              <div className="flex h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                {languages.map((lang) => (
                  <div 
                    key={lang.name}
                    className="h-full"
                    style={{ 
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color 
                    }}
                    title={`${lang.name}: ${lang.percentage}%`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.slice(0, 3).map((lang) => (
                  <span 
                    key={lang.name}
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${lang.color}20`,
                      color: lang.color 
                    }}
                  >
                    {lang.name}
                  </span>
                ))}
                {languages.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    +{languages.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <div className="flex items-center mr-4">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span>{repository.stargazers_count}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
              </svg>
              <span>{repository.forks_count}</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 mt-auto">
          <Link 
            href={repository.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium inline-flex items-center"
          >
            View Repository
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
} 