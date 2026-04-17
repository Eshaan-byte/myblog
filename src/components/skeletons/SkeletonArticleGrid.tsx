"use client";

import React from "react";
import SkeletonCard from "./SkeletonCard";

const SkeletonArticleGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
      {[0, 1, 2].map((i) => (
        <SkeletonCard key={i} variant="vertical" />
      ))}
    </div>
  );
};

export default SkeletonArticleGrid;
