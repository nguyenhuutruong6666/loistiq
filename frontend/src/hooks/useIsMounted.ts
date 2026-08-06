'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to safely determine if the component has mounted on the client.
 * Guarantees that components (like Recharts / Canvas / Tooltips) only render after actual DOM mount.
 */
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
