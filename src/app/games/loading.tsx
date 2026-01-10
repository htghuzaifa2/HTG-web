import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <Skeleton className="h-10 w-1/3 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
            
            {/* Search Bar Skeleton */}
            <div className="mb-8 max-w-xl mx-auto">
                <Skeleton className="h-11 w-full rounded-md" />
            </div>

            {/* Category Filter Skeleton */}
             <div className="mb-8">
                <Skeleton className="h-7 w-48 mx-auto mb-4" />
                <div className="flex flex-wrap justify-center gap-2">
                     {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-24 rounded-md" />)}
                </div>
            </div>

            {/* Games Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-[200px] w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
