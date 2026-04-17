"use client";

import React, { Suspense, ComponentType } from "react";
import { SkeletonSection } from "@/components/skeletons";

interface LazyComponentProps {
  children?: React.ReactNode;
}

interface LazyComponentLoaderProps {
  component: ComponentType<any>;
  fallback?: React.ReactNode;
  skeletonVariant?: "card" | "grid" | "carousel";
  skeletonCount?: number;
  delay?: number;
}

/**
 * Wraps a component with Suspense and displays a skeleton loader while loading
 * Useful for code-splitting sections that don't need to be present immediately
 */
const LazyComponentLoader: React.FC<LazyComponentLoaderProps> = ({
  component: Component,
  fallback,
  skeletonVariant = "grid",
  skeletonCount = 4,
  delay = 0,
}) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <SkeletonSection variant={skeletonVariant} count={skeletonCount} />
        )
      }
    >
      <div style={{ animationDelay: `${delay}ms` }}>
        <Component />
      </div>
    </Suspense>
  );
};

export default LazyComponentLoader;
