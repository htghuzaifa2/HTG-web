"use client";

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavigationState<T> {
  scrollY: number;
  data: T | null;
  timestamp: number;
}

const EXPIRY_TIME_MS = 15 * 60 * 1000; // 15 minutes

export function useScrollPersistence<T>(keyPrefix: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [restoredData, setRestoredData] = useState<T | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const [wasRestored, setWasRestored] = useState(false);
  const isInitialMount = useRef(true);

  // Create a unique key based on the current URL
  const storageKey = `nav_state_${keyPrefix}_${pathname}_${searchParams.toString()}`;

  // Save state before unloading or navigating away.
  // We use a ref for the latest data to avoid stale closures in event listeners if we were to use them.
  const saveState = (data: T | null) => {
    if (typeof window === 'undefined') return;

    const state: NavigationState<T> = {
      scrollY: window.scrollY,
      data,
      timestamp: Date.now(),
    };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save navigation state:', e);
    }
  };

  // Restoration Logic
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check for Hard Refresh
    if (typeof performance !== 'undefined') {
      const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        sessionStorage.removeItem(storageKey);
        setIsRestoring(false);
        return;
      }
    }

    // 2. Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 3. Attempt Restoration
    const stored = sessionStorage.getItem(storageKey);
    if (!stored) {
      setIsRestoring(false);
      return;
    }

    try {
      const state: NavigationState<T> = JSON.parse(stored);
      const now = Date.now();

      if (now - state.timestamp >= EXPIRY_TIME_MS) {
        // Expired
        sessionStorage.removeItem(storageKey);
        setIsRestoring(false);
        window.scrollTo(0, 0);
        return;
      }

      // Valid State Found
      setRestoredData(state.data);
      setWasRestored(true);

      const targetScrollY = state.scrollY;

      // Immediate attempt
      window.scrollTo(0, targetScrollY);

      // 4. Robust Restoration with ResizeObserver
      // Content might load progressively (images, api calls). We watch for height changes.
      let attempts = 0;
      const maxAttempts = 15; // Stop observing after some time/attempts to save resources
      let obs: ResizeObserver | null = null;
      let timeoutId: NodeJS.Timeout | null = null;

      const checkAndScroll = () => {
        const currentScroll = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;

        // If we are already there (approx), we might be good, BUT
        // dynamic content might push us down/up, so we force it a few times until stable.
        if (Math.abs(currentScroll - targetScrollY) < 5) {
          // We are at the target.
          // Keep observing briefly in case layout shifts.
        }

        // Try to scroll to target
        window.scrollTo(0, targetScrollY);

        // If strictly close enough and component mounted for a bit, we could stop.
        // But simplest is to run for a fixed short duration or until max attempts.
      };

      // Poll/Check on resize
      obs = new ResizeObserver(() => {
        checkAndScroll();
        attempts++;
        if (attempts > maxAttempts) {
          obs?.disconnect();
          setIsRestoring(false); // Done restoring
        }
      });

      obs.observe(document.documentElement);

      // Safety timeout to definitely stop observing after 3 seconds (e.g. slow network)
      timeoutId = setTimeout(() => {
        obs?.disconnect();
        setIsRestoring(false);
      }, 3000);

      // Cleanup
      return () => {
        obs?.disconnect();
        if (timeoutId) clearTimeout(timeoutId);
      };

    } catch (e) {
      console.error('Failed to parse navigation state:', e);
      setIsRestoring(false);
    }

  }, [storageKey]);

  return {
    isRestoring,
    wasRestored,
    restoredData,
    saveState,
  };
}
