// This component has been moved to /app/about/page.tsx
// Keeping this file for backwards compatibility - redirects to the about page

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AboutUs: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/about');
  }, [router]);

  return null;
};

export default AboutUs;
