import React from "react";

const SkeletonSuperhero = () => {
  return (
    <div className="p-3 border-b border-neutral-300 dark:border-neutral-700 h-24 animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/4 mb-1"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
    </div>
  );
};

export default SkeletonSuperhero;
