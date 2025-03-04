'use client';

import { Suspense } from 'react';
import { Skills } from './Skills';

export function SkillsWrapper() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading skills...</div>}>
      <Skills />
    </Suspense>
  );
} 