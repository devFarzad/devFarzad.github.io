import { Octokit } from '@octokit/rest';
import { formatDistanceToNow } from 'date-fns';

// Cache data to reduce API calls
let profileCache: GithubProfile | null = null;
let repositoriesCache: Repository[] | null = null;
const languagesCache: Record<string, Language[]> = {};
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
let lastProfileFetch = 0;
let lastReposFetch = 0;

// Initialize Octokit with a GitHub token if available
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  request: {
    retries: 3,
    retryAfter: 5
  }
});

const username = process.env.GITHUB_USERNAME || 'devFarzad';

// Default profile data as fallback
const defaultProfile: GithubProfile = {
  login: username,
  avatar_url: 'https://avatars.githubusercontent.com/' + username,
  html_url: 'https://github.com/' + username,
  name: 'Farzad Pousheh',
  company: null,
  blog: null,
  location: 'Remote',
  email: null,
  bio: 'Full-stack software developer specializing in creating robust, scalable applications.',
  twitter_username: null,
  public_repos: 0,
  followers: 0,
  following: 0,
  created_at: new Date().toISOString(),
};

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
    // Return cached data if available and fresh
    const now = Date.now();
    if (profileCache && now - lastProfileFetch < CACHE_DURATION) {
      return profileCache;
    }
    
    const { data } = await octokit.users.getByUsername({
      username,
    });
    
    // Update cache
    profileCache = data as GithubProfile;
    lastProfileFetch = now;
    
    return data as GithubProfile;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    // Return default profile if API call fails
    return defaultProfile;
  }
}

export async function getRepositories(): Promise<Repository[]> {
  try {
    // Return cached data if available and fresh
    const now = Date.now();
    if (repositoriesCache && now - lastReposFetch < CACHE_DURATION) {
      return repositoriesCache;
    }
    
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
    });
    
    // Update cache
    repositoriesCache = data as Repository[];
    lastReposFetch = now;
    
    return data as Repository[];
  } catch (error) {
    console.error('Error fetching repositories:', error);
    // Return empty array or mock data if API call fails
    return [];
  }
}

export async function getPinnedRepositories(): Promise<Repository[]> {
  try {
    // GitHub doesn't have a direct API for pinned repos
    // We'll fetch all repos and filter the most relevant ones
    const allRepos = await getRepositories();
    
    // If no repos, return fallback data
    if (allRepos.length === 0) {
      return Array(3).fill(null).map((_, i) => ({
        id: i,
        name: `Project ${i + 1}`,
        full_name: `${username}/project-${i + 1}`,
        description: 'A sample project description that showcases my development skills and expertise.',
        html_url: `https://github.com/${username}`,
        homepage: null,
        language: ['JavaScript', 'TypeScript', 'Python'][i % 3] || 'JavaScript',
        stargazers_count: 0,
        forks_count: 0,
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        topics: ['web', 'react', 'nextjs']
      }));
    }
    
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
    // Return fallback data
    return Array(3).fill(null).map((_, i) => ({
      id: i,
      name: `Project ${i + 1}`,
      full_name: `${username}/project-${i + 1}`,
      description: 'A sample project description that showcases my development skills and expertise.',
      html_url: `https://github.com/${username}`,
      homepage: null,
      language: ['JavaScript', 'TypeScript', 'Python'][i % 3] || 'JavaScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      topics: ['web', 'react', 'nextjs']
    }));
  }
}

export async function getLanguagesForRepo(repo: string): Promise<Language[]> {
  try {
    // Check cache first
    if (languagesCache[repo]) {
      return languagesCache[repo];
    }
    
    const { data } = await octokit.repos.listLanguages({
      owner: username,
      repo,
    });
    
    const total = Object.values(data).reduce((acc, val) => acc + (val as number), 0);
    
    const languages = Object.entries(data).map(([name, bytes]) => ({
      name,
      color: getLanguageColor(name),
      percentage: Math.round(((bytes as number) / total) * 100),
    }));
    
    // Update cache
    languagesCache[repo] = languages;
    
    return languages;
  } catch (error) {
    console.error(`Error fetching languages for ${repo}:`, error);
    // Return default languages if API call fails
    return [
      { name: 'JavaScript', color: '#f1e05a', percentage: 60 },
      { name: 'CSS', color: '#563d7c', percentage: 30 },
      { name: 'HTML', color: '#e34c26', percentage: 10 }
    ];
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