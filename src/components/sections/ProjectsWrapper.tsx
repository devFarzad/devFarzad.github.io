'use client';

import { Suspense } from 'react';
import { Projects } from './Projects';

export function ProjectsWrapper() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading projects...</div>}>
      <Projects />
    </Suspense>
  );
} 