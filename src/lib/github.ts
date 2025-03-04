import { Octokit } from '@octokit/rest';
import { formatDistanceToNow } from 'date-fns';

// Initialize Octokit with a GitHub token if available
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const username = process.env.GITHUB_USERNAME || 'devFarzad';

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  topics: string[];
}

export interface GithubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface Language {
  name: string;
  color: string;
  percentage: number;
}

export async function getGithubProfile(): Promise<GithubProfile> {
  try {
    const { data } = await octokit.users.getByUsername({
      username,
    });
    
    return data as GithubProfile;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    throw new Error('Failed to fetch GitHub profile');
  }
}

export async function getRepositories(): Promise<Repository[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
    });
    
    return data as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw new Error('Failed to fetch repositories');
  }
}

export async function getPinnedRepositories(): Promise<Repository[]> {
  try {
    // GitHub doesn't have a direct API for pinned repos
    // We'll fetch all repos and filter the most relevant ones
    const allRepos = await getRepositories();
    
    // Sort by stars and updated date to find the most relevant
    return allRepos
      .sort((a, b) => {
        // First by stars
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        // Then by most recently updated
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, 6); // Take top 6 as "pinned"
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    throw new Error('Failed to fetch pinned repositories');
  }
}

export async function getLanguagesForRepo(repo: string): Promise<Language[]> {
  try {
    const { data } = await octokit.repos.listLanguages({
      owner: username,
      repo,
    });
    
    const total = Object.values(data).reduce((acc, val) => acc + (val as number), 0);
    
    return Object.entries(data).map(([name, bytes]) => ({
      name,
      color: getLanguageColor(name),
      percentage: Math.round(((bytes as number) / total) * 100),
    }));
  } catch (error) {
    console.error(`Error fetching languages for ${repo}:`, error);
    return [];
  }
}

export function formatUpdatedAt(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Map of common programming languages to their colors
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Rust: '#dea584',
    Dart: '#00B4AB',
  };
  
  return colors[language] || '#858585';
}

export function extractSkillsFromRepositories(repositories: Repository[]): string[] {
  const skills = new Set<string>();
  
  // Add languages as skills
  repositories.forEach(repo => {
    if (repo.language) {
      skills.add(repo.language);
    }
    
    // Add topics as potential skills
    repo.topics?.forEach(topic => {
      // Filter topics that are likely to be skills
      if (isLikelySkill(topic)) {
        skills.add(formatSkillName(topic));
      }
    });
  });
  
  return Array.from(skills);
}

function isLikelySkill(topic: string): boolean {
  // Common frameworks and technologies that would be considered skills
  const skillKeywords = [
    'react', 'node', 'typescript', 'javascript', 'vue', 'angular', 'express',
    'next', 'nextjs', 'gatsby', 'graphql', 'apollo', 'firebase', 'aws', 'azure',
    'docker', 'kubernetes', 'mongo', 'mongodb', 'sql', 'postgresql', 'mysql',
    'redux', 'mobx', 'tailwind', 'css', 'sass', 'less', 'html', 'webpack', 'vite',
    'rollup', 'jest', 'testing', 'cypress', 'playwright', 'storybook', 'figma',
    'design', 'ui', 'ux', 'responsive', 'mobile', 'pwa', 'web', 'api', 'rest',
    'soap', 'auth', 'oauth', 'jwt', 'security', 'devops', 'ci', 'cd', 'git',
    'github', 'gitlab', 'bitbucket', 'python', 'django', 'flask', 'fastapi',
    'java', 'spring', 'boot', 'go', 'golang', 'rust', 'c', 'cpp', 'c++', 'csharp',
    'dotnet', 'php', 'laravel', 'symfony', 'wordpress', 'ruby', 'rails'
  ];
  
  return skillKeywords.some(keyword => 
    topic.toLowerCase().includes(keyword) || 
    keyword.includes(topic.toLowerCase())
  );
}

function formatSkillName(name: string): string {
  // Convert kebab-case or snake_case to readable format
  let formatted = name.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  formatted = formatted
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Special cases
  const specialCases: Record<string, string> = {
    'Reactjs': 'React',
    'Nodejs': 'Node.js',
    'Nextjs': 'Next.js',
    'Javascript': 'JavaScript',
    'Typescript': 'TypeScript',
    'Github': 'GitHub',
    'Api': 'API',
    'Ui': 'UI',
    'Ux': 'UX',
    'Css': 'CSS',
    'Html': 'HTML',
    'Aws': 'AWS',
    'Ci': 'CI',
    'Cd': 'CD',
    'Jwt': 'JWT',
    'Pwa': 'PWA',
  };
  
  return specialCases[formatted] || formatted;
} 