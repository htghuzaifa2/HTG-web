"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const STORAGE_KEY_PREFIX = "htg_scroll_pos_";
const EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

export function ScrollManager() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const prevPathRef = useRef<string | null>(null);

    // 1. Disable browser's default scroll restoration to take full control
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    // 2. Save scroll position of the OLD page before invalidating
    // We use a separate effect that runs when pathname changes, but captures the PREVIOUS state?
    // Actually, easiest is to listen to scroll and save "debounced" or just save on unmount/change.
    // BUT unmount might be too late for Next.js soft navigation.

    // Better approach:
    // On every render/scroll, update a "current value" ref.
    // When pathname changes, write that ref to storage keyed by the OLD pathname.

    useEffect(() => {
        const handleScroll = () => {
            // Save current scroll position for the CURRENT page continuously (or throttled)
            // so it's ready when we navigate away.
            const currentPath = window.location.pathname; // use window.location to be sure of current context
            const key = `${STORAGE_KEY_PREFIX}${currentPath}`;
            const data = {
                y: window.scrollY,
                timestamp: Date.now()
            };
            sessionStorage.setItem(key, JSON.stringify(data));
        };

        // Throttle save
        let timeoutId: NodeJS.Timeout;
        const throttledScroll = () => {
            if (timeoutId) return;
            timeoutId = setTimeout(() => {
                handleScroll();
                timeoutId = undefined!;
            }, 100);
        };

        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);


    // 3. Restore or Reset on Path Change
    useEffect(() => {
        // Current component just mounted or path changed.
        const key = `${STORAGE_KEY_PREFIX}${pathname}`;
        const stored = sessionStorage.getItem(key);



        if (stored) {
            try {
                const { y, timestamp } = JSON.parse(stored);
                const now = Date.now();

                if (now - timestamp < EXPIRY_MS) {

                    window.scrollTo(0, y);
                    return;
                } else {

                    sessionStorage.removeItem(key); // Cleanup expired
                }
            } catch (e) {
                console.error("Failed to parse scroll data", e);
            }
        }

        // Default: Reset to top if no valid saved state

        window.scrollTo(0, 0);

    }, [pathname, searchParams]); // Run on route change

    return null;
}
