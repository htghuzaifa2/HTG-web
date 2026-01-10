import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            <article className="blog-post container mx-auto py-12">
                <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
                
                <div className="flex justify-center mb-12">
                    <Skeleton className="h-6 w-32" />
                </div>

                <div className="blog-content space-y-4 max-w-4xl mx-auto">
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-5/6" />
                     <Skeleton className="h-64 w-full rounded-xl my-8" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-full" />
                     <Skeleton className="h-4 w-4/5" />
                </div>
            </article>

            {/* Related products section placeholder */}
            <div className="container mx-auto px-4 pb-16">
                 <Skeleton className="h-8 w-48 mb-6" />
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                 </div>
            </div>
        </>
    );
}
