
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import type { Product, ImageObject } from "@/lib/types";
import ProductImageGallery from "@/components/product-image-gallery";
import { Badge } from "@/components/ui/badge";
import ProductInfoAccordion from "./product-info-tabs";
import { Separator } from "@/components/ui/separator";
import { getProductData } from "@/lib/data-fetching";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product-card";
import { useRouter } from 'next/navigation';
import { ShoppingCart, Check } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="text-muted-foreground mt-2">The product you're looking for does not exist.</p>
      </div>
    );
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    // Reset the button after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const images: ImageObject[] = [product.image, ...product.additionalImages];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
      {/* 
        Layout Strategy:
        - Mobile: Stacked (Image -> Info)
        - Tablet (MD): Two columns, balanced spacing
        - Desktop (LG): Wider gap, sticky info
       */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-10 lg:gap-16">

        {/* Left Column: Gallery */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          <ProductImageGallery images={images} productName={product.name} />
        </div>

        {/* Right Column: Info */}
        <div className="flex flex-col justify-start animate-in fade-in slide-in-from-bottom-12 duration-700 delay-100 ease-out fill-mode-backwards">

          {/* Breadcrumb / Category or ID (Optional subtle detail) */}
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground uppercase tracking-widest font-medium">
            <span>{product.category[0] || 'Collection'}</span>
            <span>/</span>
            <span>ID: {product.id}</span>
          </div>

          <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards">
            <div className="flex items-baseline gap-3">
              <p className="font-headline text-4xl lg:text-5xl font-bold text-primary">
                {`PKR ${Math.round(product.price).toLocaleString()}`}
              </p>
            </div>
            <div className="h-8 w-[1px] bg-border mx-2" />
            <Badge variant={isOutOfStock ? "destructive" : "secondary"} className="px-3 py-1 text-sm font-medium tracking-wide items-center justify-center h-fit">
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </Badge>
          </div>

          <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-lg">
            <p>{product.shortDescription}</p>
          </div>

          <div className="mt-10 pt-8 border-t border-border/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={`w-full sm:w-auto min-w-[240px] h-14 text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-primary/25 ${addedToCart ? 'bg-green-600 hover:bg-green-700' : ''}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
              >
                {addedToCart ? (
                  <>
                    <Check className="mr-2 h-6 w-6" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-6 w-6" />
                    Add to Cart
                  </>
                )}
              </Button>
              {/* Optional Wishlist or Share button could go here */}
            </div>
            <p className="mt-4 text-sm text-icon-muted flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Custom size available for free
            </p>
          </div>

          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards">
            <ProductInfoAccordion
              description={product.description}
              specifications={product.specs || product.specifications}
              defaultOpen="description"
            />
          </div>
        </div>
      </div>

      <div className="my-16 md:my-24">
        <Separator className="bg-border/50" />
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">You Might Also Like</h2>
            <p className="text-muted-foreground text-lg">Curated picks just for you</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} priority={index < 5} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
