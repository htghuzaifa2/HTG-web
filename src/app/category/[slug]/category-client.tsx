
"use client";

import { useMemo, useRef } from "react";
import type { Category } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ProductGridLoader } from "@/components/product-grid-loader";
import { useRouter, useSearchParams } from "next/navigation";

type SortOrder = "newest" | "oldest" | "price-asc" | "price-desc";

interface CategoryClientProps {
  category: Category;
}

export default function CategoryClient({ category }: CategoryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const topOfProductsRef = useRef<HTMLDivElement>(null);
  
  const sortParam = searchParams.get('sort') || 'newest';

  const sortOrder = useMemo<SortOrder>(() => {
    const validSortOrders: SortOrder[] = ["newest", "oldest", "price-asc", "price-desc"];
    return validSortOrders.includes(sortParam as SortOrder) ? sortParam as SortOrder : "newest";
  }, [sortParam]);

  const handleSortChange = (value: SortOrder) => {
    const newUrl = `/category/${category.slug}${value !== 'newest' ? `?sort=${value}` : ''}`;
    router.push(newUrl);
    if (topOfProductsRef.current) {
        topOfProductsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 content-fade-in">
      <h1 className="mb-2 text-center font-headline text-4xl font-bold">
        {category.name}
      </h1>
      <p className="mb-8 text-center text-muted-foreground">
        {`Browse our collection of ${category.name.toLowerCase()}.`}
      </p>

      <div ref={topOfProductsRef} className="scroll-mt-20" />
      
      <div className="flex justify-end mb-8">
        <div className="flex items-center gap-2">
          <Label htmlFor="sort-by" className="text-sm font-medium">Sort by</Label>
          <Select onValueChange={(value: SortOrder) => handleSortChange(value)} value={sortOrder}>
            <SelectTrigger id="sort-by" className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Latest (New to Old)</SelectItem>
              <SelectItem value="oldest">Oldest (Old to New)</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
       <ProductGridLoader key={`${category.slug}-${sortOrder}`} category={category.slug} sortBy={sortOrder} />
    </div>
  );
}
