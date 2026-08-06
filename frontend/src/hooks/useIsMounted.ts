'use client';

import { useState, useEffect } from 'react';

export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => {
      cancelAnimationFrame(handle);
    };
  }, []);

  return mounted;
}
