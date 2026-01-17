'use client';

import { useEffect } from 'react';

// All Unsplash images used in website example components
// These will be preloaded in the background for instant preview
const EXAMPLE_IMAGES = [
  // Architect
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2560&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1555636222-cae831e670b3?q=80&w=2077&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1577083288073-40892c0860a4?q=80&w=2076&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',

  // AshfordHouse
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=700&h=500&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop&q=80',
  'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80',

  // CamdenBarbers
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&h=1000&fit=crop&q=80',
  'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&q=80',

  // BloomWellness
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=800&fit=crop&q=80',

  // FlowdeskProffesional
  'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80',

  // HowthRoadRoasters
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=800&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&h=400&fit=crop&q=80',

  // KMurphy
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80',

  // SurgeFitness
  'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&q=80',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop&q=80',

  // LOUDStudio
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&h=1080&fit=crop&q=80',
  'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&h=600&fit=crop&q=80',
];

// Preload a single image
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject();
    img.src = src;
  });
};

// Preload images in batches to avoid overwhelming the browser
const preloadImagesInBatches = async (images: string[], batchSize = 4) => {
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    await Promise.allSettled(batch.map(preloadImage));
    // Small delay between batches to not block main thread
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

// Hook to preload images
export function useImagePreloader() {
  useEffect(() => {
    // Start preloading after a short delay to not compete with critical resources
    const timer = setTimeout(() => {
      preloadImagesInBatches(EXAMPLE_IMAGES);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
}

// Component that triggers preloading
export default function ImagePreloader() {
  useImagePreloader();
  return null;
}

// Export the image list for use elsewhere if needed
export { EXAMPLE_IMAGES };
