import React from 'react';

function SkeletonWebSearch() {
  return (
    <div className="flex animate-pulse bg-gray-300 w-full h-[120px] rounded gap-4 mb-2">
      <div className="bg-gray-200 w-[190px] h-[120px] rounded"></div>
      <div className="flex flex-col w-[250px] justify-center">
        <div className="bg-gray-200 w-3/4 h-4 mb-2"></div>
        <div className="bg-gray-200 w-3/4 h-4"></div>
      </div>
    </div>
  );
}

export default SkeletonWebSearch;
