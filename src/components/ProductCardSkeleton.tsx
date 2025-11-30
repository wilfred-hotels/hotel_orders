"use client";

import { Skeleton } from "@/components/ui/skeleton"; 
import { Button } from "@/components/ui/button"; 

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col h-full">
      {/* Image Skeleton */}
      <div className="relative w-full aspect-square md:aspect-4/3">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 flex flex-col justify-between p-3 sm:p-4">
        <div>
          {/* Title Skeleton */}
          <div className="flex justify-between items-start mb-2">
            <Skeleton className="h-4 w-2/3" />
            {/* Discount Skeleton */}
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Description Skeleton */}
          <Skeleton className="h-4 w-3/4 mb-3" />
          <Skeleton className="h-4 w-3/4" />

          {/* Price + Rating Skeleton */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16 mt-2" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-5 w-5 rounded-full mr-2" />
              <Skeleton className="h-5 w-12" />
            </div>
          </div>
        </div>

        {/* Button Skeleton */}
        <Button
          className="w-full font-semibold py-2 sm:py-2.5 rounded-lg transition bg-gray-300 cursor-not-allowed mt-3"
          disabled={true}
        >
          <Skeleton className="w-full h-4" />
        </Button>
      </div>
    </div>
  );
}
