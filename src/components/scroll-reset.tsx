"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ScrollReset() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // List of paths that have their own scroll restoration logic (e.g. infinite scroll lists)
    // We avoid forcing scroll to top for these to prevent fighting with their restoration logic
    // when navigating BACK to them.
    const listPaths = ['/', '/all-products', '/games'];
    const isListPath = listPaths.includes(pathname) || pathname.startsWith('/category/');

    // For detail pages (Product, About, Contact, etc.), always force scroll to top.
    // This fixes the issue where navigating to a new page starts at the previous page's scroll position.
    if (!isListPath) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Force instant jump to avoid smooth scroll lag
      });
    }
  }, [pathname, searchParams]);

  return null;
}
