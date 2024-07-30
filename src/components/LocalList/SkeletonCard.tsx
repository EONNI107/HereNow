import React from 'react';

function SkeletonCard(): React.ReactElement {
  return (
    <div className="border rounded-3xl overflow-hidden shadow-xl relative">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-transparent flex flex-col justify-center p-4">
          <div className="h-4 bg-gray-300 w-1/3 mb-2"></div>
          <div className="h-6 bg-gray-300 w-3/4 mb-1"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
