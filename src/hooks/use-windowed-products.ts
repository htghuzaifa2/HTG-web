
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Product } from '@/lib/types';
import productsData from '@/data/products.json';
import { useDebounce } from './use-debounce';
import { useScrollPersistence } from './use-scroll-persistence';

const WINDOW_SIZE = 25;

// Fisher-Yates shuffle algorithm
const shuffle = (array: Product[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
};

// --- Session Storage Utilities ---
const getSessionItem = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  } catch (error) {
    console.error(`Error reading sessionStorage key “${key}”:`, error);
    return null;
  }
};

const setSessionItem = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage key “${key}”:`, error);
  }
};


export function useWindowedProducts() {
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>([]);
  const [windows, setWindows] = useState<Product[][]>([[], [], []]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0); // The start index of the very first visible window
  const [isLoading, setIsLoading] = useState(true);

  const gridRef = useRef<HTMLDivElement>(null);

  // Debounce for load more clicks
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);
  const debouncedLoadMore = useDebounce(loadMoreClicks, 200);

  // For "Load Previous" sticky bar
  const [isLoadPreviousVisible, setIsLoadPreviousVisible] = useState(false);
  const lastScrollY = useRef(0);

  // Use the new persistence hook
  // We store the shuffled order and the list of visible IDs
  type PersistedState = {
    shuffledOrder: number[];
    visibleIds: number[];
  };

  const { isRestoring, wasRestored, restoredData, saveState } = useScrollPersistence<PersistedState>('windowed_products');

  // Derived state
  const canLoadMore = startIndex + visibleProducts.length < shuffledProducts.length;
  const canLoadPrevious = startIndex > 0;

  // -- Initialization and State Restoration --
  useEffect(() => {
    let initialShuffle: Product[];

    if (wasRestored && restoredData) {
      // Recreate the exact same shuffle
      const productMap = new Map((productsData as unknown as Product[]).map(p => [p.id, p]));
      initialShuffle = restoredData.shuffledOrder.map((id: number) => productMap.get(id)).filter(Boolean) as Product[];
      setShuffledProducts(initialShuffle);

      // Recreate the visible products
      const restoredProducts = restoredData.visibleIds.map((id: number) => productMap.get(id)).filter(Boolean) as Product[];
      setVisibleProducts(restoredProducts);

      const firstVisibleId = restoredData.visibleIds[0];
      const newStartIndex = initialShuffle.findIndex(p => p.id === firstVisibleId);
      setStartIndex(newStartIndex >= 0 ? newStartIndex : 0);

      // Loading state is handled by the hook's isRestoring, but we sync our local loading state
      setIsLoading(false);

    } else if (!isRestoring) {
      // Standard fresh load (only if not currently trying to restore)
      initialShuffle = shuffle([...(productsData as unknown as Product[])]);
      setShuffledProducts(initialShuffle);
      const initialWindow = initialShuffle.slice(0, WINDOW_SIZE);
      setWindows([initialWindow, [], []]);
      setVisibleProducts(initialWindow);
      setIsLoading(false);
    }
  }, [isRestoring, wasRestored, restoredData]);


  // -- Scroll Position & State Saving --
  useEffect(() => {
    const handleScroll = () => {
      // For "Load Previous" bar visibility
      if (canLoadPrevious) {
        const currentScrollY = window.scrollY;
        if (currentScrollY < lastScrollY.current) {
          setIsLoadPreviousVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }

      // For saving position via our hook
      const visibleIds = visibleProducts.map(p => p.id);
      if (visibleIds.length > 0 && shuffledProducts.length > 0) {
        saveState({
          shuffledOrder: shuffledProducts.map(p => p.id),
          visibleIds: visibleIds
        });
      }
    };

    const throttledScroll = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [visibleProducts, shuffledProducts, canLoadPrevious, saveState]);



  const appendToGrid = (productsToAppend: Product[]) => {
    if (!gridRef.current) return;
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');

    // This is a way to render React components to an HTML string client-side
    // and then append them. We avoid this and just update state.
    // ReactDOM.render(<>{productsToAppend.map(p => <ProductCard key={p.id} product={p}/>)}</>, tempDiv);
    // while (tempDiv.firstChild) {
    //   fragment.appendChild(tempDiv.firstChild);
    // }
    // gridRef.current.appendChild(fragment);

    // The React way is to update state and let React handle the DOM
    setVisibleProducts(prev => [...prev, ...productsToAppend]);
  };

  const prependToGrid = (productsToPrepend: Product[]) => {
    setVisibleProducts(prev => [...productsToPrepend, ...prev]);
  };

  const removeFromGrid = (count: number, from: 'top' | 'bottom') => {
    if (!gridRef.current) return;
    if (from === 'top') {
      setVisibleProducts(prev => prev.slice(count));
    } else {
      setVisibleProducts(prev => prev.slice(0, prev.length - count));
    }
  };

  const loadMore = useCallback(() => {
    if (!canLoadMore || isLoading) return;
    setIsLoading(true);

    const currentVisibleCount = visibleProducts.length;
    const isWindowed = currentVisibleCount >= WINDOW_SIZE * 3;

    if (isWindowed) {
      // Unload first window
      removeFromGrid(WINDOW_SIZE, 'top');
    }

    const newStartIndex = isWindowed ? startIndex + WINDOW_SIZE : startIndex;
    const nextWindowStart = newStartIndex + currentVisibleCount;
    const productsToAppend = shuffledProducts.slice(nextWindowStart, nextWindowStart + WINDOW_SIZE);

    appendToGrid(productsToAppend);
    setStartIndex(newStartIndex);

    // Give react time to render before setting loading to false
    setTimeout(() => setIsLoading(false), 100);

  }, [canLoadMore, isLoading, visibleProducts.length, shuffledProducts, startIndex]);

  // Handle debounced click
  useEffect(() => {
    if (loadMoreClicks > 0) {
      loadMore();
    }
  }, [debouncedLoadMore]);

  const loadPrevious = useCallback(() => {
    if (!canLoadPrevious || isLoading) return;
    setIsLoading(true);
    const prevHeight = gridRef.current?.scrollHeight || 0;

    // Unload last window
    removeFromGrid(WINDOW_SIZE, 'bottom');

    const newStartIndex = startIndex - WINDOW_SIZE;
    const productsToPrepend = shuffledProducts.slice(newStartIndex, newStartIndex + WINDOW_SIZE);

    prependToGrid(productsToPrepend);
    setStartIndex(newStartIndex);

    // Restore scroll position after DOM update
    requestAnimationFrame(() => {
      const newHeight = gridRef.current?.scrollHeight || 0;
      window.scrollBy(0, newHeight - prevHeight);
      setIsLoading(false);
    });

  }, [canLoadPrevious, isLoading, startIndex, shuffledProducts]);

  return {
    products: visibleProducts,
    isLoading: isLoading && !isRestoring,
    isRestoring,
    loadMore: () => setLoadMoreClicks(c => c + 1),
    loadPrevious,
    canLoadMore,
    canLoadPrevious,
    gridRef,
    isLoadPreviousVisible,
    setIsLoadPreviousVisible,
    wasRestored
  };
}
