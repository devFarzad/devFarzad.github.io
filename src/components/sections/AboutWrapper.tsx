'use client';

import { Suspense } from 'react';
import { About } from './About';

export function AboutWrapper() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading about...</div>}>
      <About />
    </Suspense>
  );
} 