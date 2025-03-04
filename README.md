# Dynamic Portfolio with GitHub Integration

A state-of-the-art portfolio website that dynamically integrates with your GitHub profile to showcase your projects and skills.

![Portfolio Screenshot](./screenshot.png)

## Features

- **Dynamic GitHub Integration**: Automatically fetches and displays your profile, repositories, and skills from GitHub
- **Modern UI**: Built with Next.js, TypeScript, TailwindCSS, and ShadCN UI
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Animated Interface**: Smooth animations with Framer Motion
- **SEO Optimized**: Best practices for search engine optimization
- **Performance Focused**: Fast load times and optimized assets

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN UI
- **Animations**: Framer Motion
- **Data Fetching**: Octokit (GitHub API)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- GitHub account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Create a `.env.local` file in the root directory with your GitHub username:
   ```
   GITHUB_USERNAME=yourusername
   ```

   For advanced features (like private repositories or higher rate limits), add a GitHub token:
   ```
   GITHUB_TOKEN=your_github_token
   ```
   You can generate a token at [GitHub Developer Settings](https://github.com/settings/tokens).

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Customization

### Changing Profile Data

Your GitHub profile information is automatically fetched, but you can customize certain sections:

1. **Work Experience**: Edit the data in `src/components/sections/Experience.tsx`
2. **Contact Information**: Update in `src/components/sections/Contact.tsx` and `src/components/layout/Footer.tsx`
3. **Hero Section**: Modify text in `src/components/sections/Hero.tsx`

### Styling

The portfolio uses TailwindCSS for styling:

- Global styles: `src/app/globals.css`
- Theme colors: Modify in your `tailwind.config.js`
- Component styles: Each component has its own styling using Tailwind classes

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Import the project in [Vercel](https://vercel.com)
3. Set your environment variables (GITHUB_USERNAME, GITHUB_TOKEN)
4. Deploy!

### Other Platforms

The project can be deployed on any platform that supports Next.js applications, such as Netlify, AWS Amplify, or traditional hosting with a Node.js server.

## Project Structure

```
portfolio/
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # App router pages
│   ├── components/       # UI components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── sections/     # Page sections (Hero, About, Projects, etc.)
│   │   └── ui/           # UI components from ShadCN
│   └── lib/              # Utilities and API functions
│       ├── github.ts     # GitHub API integration
│       └── utils/        # Helper utilities
├── .env.local            # Environment variables (create this)
├── next.config.ts        # Next.js configuration
└── tailwind.config.js    # Tailwind configuration
```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [ShadCN UI](https://ui.shadcn.com/) - UI component library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Octokit](https://github.com/octokit/rest.js) - GitHub API client
