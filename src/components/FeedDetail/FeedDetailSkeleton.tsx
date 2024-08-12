import React from 'react';

function FeedDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex items-center justify-between h-14 mt-2 px-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
          <div className="w-24 h-4 bg-gray-300"></div>
        </div>
        <div className="w-24 h-8 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="w-full h-64 bg-gray-300"></div>
      <div className="mx-4 mb-5 px-4 py-2.5 bg-white rounded-3xl">
        <div className="w-3/4 h-6 bg-gray-300 mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 mb-2"></div>
        <div className="w-full h-20 bg-gray-300"></div>
      </div>
    </div>
  );
}

export default FeedDetailSkeleton;
