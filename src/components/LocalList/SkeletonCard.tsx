import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 mb-2"></div>
        <div className="h-4 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
