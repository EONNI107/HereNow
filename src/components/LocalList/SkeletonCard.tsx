import React from 'react';

function SkeletonCard(): React.ReactElement {
  return (
    <div className="border rounded-3xl overflow-hidden shadow-xl relative w-[343px] h-[140px] animate-pulse">
      <div className="relative h-full">
        <div className="bg-gray3 w-full h-48"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray5 to-transparent flex flex-col justify-center p-4">
          <div className="max-w-[70%]">
            <div className="h-4 bg-gray2 w-1/3 mb-1 rounded"></div>
            <div className="h-6 bg-gray2 w-3/4 mb-1 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
