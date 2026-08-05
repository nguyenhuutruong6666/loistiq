'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Custom hook to safely determine if the component has mounted on the client.
 * Uses `useSyncExternalStore` to avoid cascading render warnings and hydration mismatches.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
