import React from "react";

const SkeletonSidebar: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-5 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-24 bg-muted rounded animate-pulse" />
        <div className="h-4 w-12 bg-muted rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-start gap-3 py-2 px-2">
            <div className="flex-1 space-y-2">
              <div className="h-3 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-3 w-3/4 bg-muted rounded animate-pulse" />
            </div>
            {i === 0 ? null : <div className="w-16 h-16 flex-shrink-0 rounded bg-muted animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonSidebar;
