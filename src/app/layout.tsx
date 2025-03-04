import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroAnimationCSS } from "@/components/sections/Hero";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farzad Pousheh | Full-stack Developer",
  description: "Personal portfolio of Farzad Pousheh, a full-stack developer specializing in Next.js, React, TypeScript, and modern web technologies.",
  keywords: "Farzad Pousheh, developer, software engineer, web developer, frontend, backend, full-stack, React, Next.js, TypeScript",
  authors: [{ name: "Farzad Pousheh" }],
  creator: "Farzad Pousheh",
  metadataBase: new URL('https://farzadpousheh.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://farzadpousheh.dev',
    title: 'Farzad Pousheh | Full-stack Developer',
    description: 'Personal portfolio of Farzad Pousheh, a full-stack developer specializing in Next.js, React, TypeScript, and modern web technologies.',
    siteName: 'Farzad Pousheh Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Farzad Pousheh Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farzad Pousheh | Full-stack Developer',
    description: 'Personal portfolio of Farzad Pousheh, a full-stack developer specializing in Next.js, React, TypeScript, and modern web technologies.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  other: {
    'apple-mobile-web-app-title': 'developer',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var themeLocalStorage = localStorage.getItem('theme');
                  var themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var theme = themeLocalStorage ? themeLocalStorage : themeSystem;
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error(e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background min-h-screen`}
      >
        <Header />
        {children}
        <Footer />
        <HeroAnimationCSS />
        <Analytics />
      </body>
    </html>
  );
}
