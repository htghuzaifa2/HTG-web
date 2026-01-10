
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { useLightbox } from "@/context/lightbox-context";
import type { ImageObject } from "@/lib/types";

interface ProductImageGalleryProps {
  images: ImageObject[];
  productName: string;
  isQuickView?: boolean;
}

const ImageSlot = ({ src, alt, priority = false, fill = false, sizes = "", isQuickView = false }: { src: string, alt: string, priority?: boolean, fill?: boolean, sizes?: string, isQuickView?: boolean }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative w-full h-full", isQuickView ? "pointer-events-none" : "")}>
      {isLoading && <Skeleton className="absolute inset-0" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : 600}
        height={fill ? undefined : 600}
        sizes={sizes}
        priority={priority}
        className={cn(
          "object-contain transition-opacity duration-500 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

export default function ProductImageGallery({ images, productName, isQuickView = false }: ProductImageGalleryProps) {
  const [mainApi, setMainApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [thumbApi, setThumbApi] = useState<ReturnType<typeof useEmblaCarousel>[1]>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainRef, emblaMainApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [thumbRef, emblaThumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const { openLightbox } = useLightbox();

  useEffect(() => setMainApi(emblaMainApi), [emblaMainApi]);
  useEffect(() => setThumbApi(emblaThumbApi), [emblaThumbApi]);

  const onThumbClick = useCallback((index: number) => {
    if (!mainApi) return;
    mainApi.scrollTo(index);
  }, [mainApi]);

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    const newSelectedIndex = mainApi.selectedScrollSnap();
    setSelectedIndex(newSelectedIndex);
    thumbApi.scrollTo(newSelectedIndex);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.stopPropagation();
        scrollNext();
      } else if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        scrollPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      mainApi.off("select", onSelect);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mainApi, onSelect, scrollNext, scrollPrev]);

  const handleOpenLightbox = (index: number) => {
    if (isQuickView) return;
    const imageUrls = images.map(img => img.url);
    openLightbox(imageUrls, index, productName);
  };

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      {/* Main Image View */}
      <div className="relative w-full overflow-hidden rounded-xl border border-border/50 bg-secondary/20 shadow-sm group">

        {/* Aspect Ratio Control: 
            Mobile: Square (balanced)
            Tablet: Square (balanced)
            Desktop: Square or 4/5 (as typically side-by-side)
        */}
        <div className="relative aspect-square w-full max-h-[50vh] md:max-h-[600px] lg:max-h-none">
          <div className="overflow-hidden h-full w-full absolute inset-0" ref={mainRef}>
            <div className="flex h-full">
              {images.map((img, index) => (
                <div
                  className={cn(
                    "relative w-full flex-shrink-0 flex-grow-0 basis-full h-full flex items-center justify-center",
                    !isQuickView && "cursor-zoom-in"
                  )}
                  key={index}
                  onClick={() => handleOpenLightbox(index)}
                >
                  <ImageSlot
                    src={img.url}
                    alt={img.alt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    isQuickView={isQuickView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Buttons - Glassmorphic */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-0"
              onClick={(e) => { e.stopPropagation(); scrollNext(); }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Pagination Dots (Mobile/quick indicator) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/5">
            {images.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  selectedIndex === i ? "w-6 bg-white" : "w-1.5 bg-white/50"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails - Hidden on very small screens if needed, or keeping standard */}
      {images.length > 1 && (
        <div className="relative w-full mt-2">
          <div className="overflow-hidden" ref={thumbRef}>
            <div className="flex gap-3 px-1">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={cn(
                    "relative aspect-square shrink-0 w-20 sm:w-24 overflow-hidden rounded-lg border-2 transition-all duration-300 ease-out",
                    selectedIndex === index
                      ? "border-primary ring-2 ring-primary/20 scale-105 opacity-100 shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100 hover:scale-105"
                  )}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
