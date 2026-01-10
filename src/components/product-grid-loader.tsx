
'use client';

import { useScrollPersistence } from '@/hooks/use-scroll-persistence';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Product } from '@/lib/types';
import { fetchProducts as serverFetchProducts } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import ProductCard from './product-card';
import { ArrowDown } from 'lucide-react';
import productsData from '@/data/products.json';

const BATCH_SIZE = 25;



function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, i) => (
        <ProductCard key={`skeleton-${i}`} product={null} />
      ))}
    </div>
  );
}

export function ProductGridLoader({ category, sortBy, randomize = false, searchQuery }: { category?: string, sortBy?: string, randomize?: boolean, searchQuery?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const storageKey = `grid-${category || 'all'}-${sortBy || 'default'}-${randomize}`;

  const fetchAndSetProducts = useCallback(
    async (page: number, keepExisting = false) => {
      setIsLoading(true);

      const fetchParams = {
        page,
        limit: BATCH_SIZE,
        category,
        sortBy,
        randomize,
      };

      let productsToProcess: Product[] = [...(productsData as unknown as Product[])];

      if (category) {
        productsToProcess = productsToProcess.filter(p => p.category.includes(category));
      }

      switch (sortBy) {
        case 'newest':
          productsToProcess.sort((a, b) => b.id - a.id);
          break;
        case 'oldest':
          productsToProcess.sort((a, b) => a.id - b.id);
          break;
        case 'price-asc':
          productsToProcess.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          productsToProcess.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      const totalProducts = productsToProcess.length;
      const start = (page - 1) * BATCH_SIZE;
      const end = start + BATCH_SIZE;
      const newProducts = productsToProcess.slice(start, end);

      setProducts((prev) => {
        const currentProducts = keepExisting ? prev : [];
        const allProducts = [...currentProducts, ...newProducts];
        const productMap = new Map(allProducts.map(p => [p.id, p]));
        return Array.from(productMap.values());
      });

      setTotal(totalProducts);
      setHasMore(newProducts.length > 0 && (page * BATCH_SIZE) < totalProducts);
      setCurrentPage(page);
      setIsLoading(false);
    },
    [category, sortBy, randomize]
  );

  // Define the persisted state structure
  type PersistedState = {
    products: Product[];
    currentPage: number;
    hasMore: boolean;
    total: number;
  };

  const { isRestoring, restoredData, saveState } = useScrollPersistence<PersistedState>(storageKey);

  useEffect(() => {
    // This effect should not handle search query logic.
    if (searchQuery) return;

    if (restoredData) {
      setProducts(restoredData.products);
      setCurrentPage(restoredData.currentPage);
      setHasMore(restoredData.hasMore);
      setTotal(restoredData.total);
      setIsLoading(false);
    } else if (!isRestoring) {
      // Initial load only if not restoring
      setProducts([]);
      setCurrentPage(1);
      setHasMore(true);
      fetchAndSetProducts(1, false);
    }
  }, [category, sortBy, randomize, searchQuery, fetchAndSetProducts, isRestoring, restoredData]);

  // Save state
  useEffect(() => {
    if (searchQuery) return; // Don't persist search results here

    if (products.length > 0) {
      saveState({
        products,
        currentPage,
        hasMore,
        total
      });
    }
  }, [products, currentPage, hasMore, total, saveState, searchQuery]);

  const loadMoreProducts = () => {
    if (hasMore && !isLoading) {
      fetchAndSetProducts(currentPage + 1, true);
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <div>
        <ProductGridSkeleton />
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        {searchQuery ? "No products found matching your search." : "No products found in this category."}
      </div>
    )
  }

  // Do not render if a search query is present, as search-client will handle it
  if (searchQuery) {
    return null;
  }

  return (
    <div>
      <div ref={gridRef} className="scroll-mt-20" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((p, i) => <ProductCard key={`${p.id}-${i}`} product={p} priority={i < 10} />)}
      </div>

      {isLoading && products.length > 0 &&
        <div className="mt-8">
          <ProductGridSkeleton />
        </div>
      }

      {hasMore && !isLoading && (
        <div className="mt-8 flex justify-center">
          <Button onClick={loadMoreProducts} disabled={isLoading} size="lg">
            {isLoading ? 'Loading...' : 'Load More'}
            <ArrowDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
