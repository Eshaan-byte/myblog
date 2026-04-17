"use client";

import React from "react";
import SkeletonCard from "./SkeletonCard";

interface SkeletonSectionProps {
  count?: number;
  variant?: "card" | "grid" | "carousel";
}

const SkeletonSection: React.FC<SkeletonSectionProps> = ({
  count = 4,
  variant = "card",
}) => {
  if (variant === "grid") {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(count)].map((_, i) => (
            <SkeletonCard key={i} variant="vertical" />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "carousel") {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 bg-muted rounded animate-pulse" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72">
              <SkeletonCard variant="featured" className="!h-[280px]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default card layout
  return (
    <div className="space-y-4">
      <div className="h-8 w-32 bg-muted rounded animate-pulse" />
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <SkeletonCard key={i} variant="horizontal" />
        ))}
      </div>
    </div>
  );
};

export default SkeletonSection;
