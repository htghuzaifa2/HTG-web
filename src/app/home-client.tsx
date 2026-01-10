
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FeaturedProducts from '@/components/featured-products';
import { useEffect, useRef } from 'react';

export default function HomeClient() {
    // Observer logic removed to prevent visibility issues
    /* 
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // ... (removed)
    }, []); 
    */

    return (
        <div className="bg-background">
            <style jsx>{`
                .hero-text {
                    animation: slideInUp 0.8s ease-out;
                }
                .hero-buttons {
                    animation: slideInUp 1s ease-out;
                }
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>

            <section className="w-full py-20 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="hero-text font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
                        Quality & Style, Delivered
                    </h1>
                    <p className="hero-text font-body mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
                        Welcome to HTG—where Sialkot's finest meets global fashion HTG – Style Without Borders.
                    </p>
                    <div className="hero-buttons mt-8 flex flex-col items-center gap-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button asChild size="lg" className="transition-transform hover:scale-105 duration-300">
                                <Link href="/all-products" prefetch={true}>Shop Now</Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="transition-transform hover:scale-105 duration-300">
                                <Link href="/categories" prefetch={true}>Browse Categories</Link>
                            </Button>
                        </div>
                        <div className="mt-2 animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-200">
                            <p className="text-sm font-medium text-muted-foreground">
                                Custom size available for free - <Link href="/custom-size" className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors">See Here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <FeaturedProducts />
            </div>

            <section className="text-center py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">See Our Full Collection</h2>
                    <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
                        Ready to see more? Browse our entire catalog to find exactly what you're looking for.
                    </p>
                    <Button asChild size="lg" className="mt-8 transition-transform hover:scale-105 duration-300">
                        <Link href="/all-products" prefetch={true}>View All Products</Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
