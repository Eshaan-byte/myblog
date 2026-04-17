"use client";

import React from "react";

const SkeletonHero: React.FC = () => {
  return (
    <div className="relative glass-panel rounded-2xl p-8 overflow-hidden min-h-[400px] flex flex-col justify-between animate-pulse">
      <div className="relative z-10 space-y-4">
        <div className="h-6 w-32 bg-muted rounded-md animate-pulse" />
        <div className="h-4 w-48 bg-muted rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-8 w-full max-w-lg bg-muted rounded animate-pulse" />
          <div className="h-8 w-3/4 max-w-lg bg-muted rounded animate-pulse" />
        </div>
        <div className="h-4 w-96 bg-muted rounded animate-pulse" />
        <div className="flex gap-3">
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
          <div className="h-6 w-20 bg-muted rounded-full animate-pulse" />
        </div>
      </div>
      <div className="h-10 w-32 bg-muted rounded-full animate-pulse" />
    </div>
  );
};

export default SkeletonHero;
