import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                 <div className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 gap-2 -ml-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Games
                </div>
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Game Title */}
            <div className="text-center mb-6">
                <Skeleton className="h-6 w-24 mx-auto mb-2 rounded-full" />
                <Skeleton className="h-10 w-64 mx-auto mt-2" />
                <Skeleton className="h-4 w-96 mx-auto mt-2 max-w-2xl" />
            </div>

            {/* Game Container */}
            <div className="relative w-full max-w-5xl mx-auto aspect-video bg-muted rounded-xl overflow-hidden shadow-xl border border-border">
                 <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted z-10">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="h-20 w-20 rounded-full bg-primary/20 animate-ping absolute inset-0" />
                            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center relative">
                                <span className="text-4xl animate-pulse">🎮</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Skeleton className="h-4 w-32" />
                            <div className="flex gap-1">
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen Button Placeholder */}
             <div className="flex justify-center mt-4">
                <Button disabled variant="outline" size="lg" className="gap-2">
                    <Maximize2 className="h-5 w-5" />
                    Fullscreen
                </Button>
            </div>

            {/* Instructions */}
            <div className="mt-8 max-w-2xl mx-auto text-center">
                <h3 className="font-semibold text-lg mb-2">How to Play</h3>
                <Skeleton className="h-4 w-3/4 mx-auto" />
            </div>
        </div>
    );
}
