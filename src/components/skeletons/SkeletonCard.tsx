import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  variant?: "vertical" | "horizontal" | "featured";
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = "vertical",
  className,
}) => {
  if (variant === "featured") {
    return (
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden h-[320px] bg-muted animate-pulse",
          className
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/10 via-transparent to-muted-foreground/5" />
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className={cn("flex gap-4 p-2 rounded-xl", className)}>
        <div className="w-[120px] h-[90px] flex-shrink-0 rounded-lg bg-muted animate-pulse" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-24 bg-muted rounded animate-pulse" />
          <div className="h-4 w-full bg-muted rounded animate-pulse" />
          <div className="h-3 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // Default vertical variant
  return (
    <div className={cn("rounded-xl overflow-hidden", className)}>
      <div className="w-full h-28 rounded-lg bg-muted animate-pulse mb-3" />
      <div className="p-3 space-y-3">
        <div className="h-3 w-16 bg-muted rounded animate-pulse" />
        <div className="h-4 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-3/4 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export default SkeletonCard;
