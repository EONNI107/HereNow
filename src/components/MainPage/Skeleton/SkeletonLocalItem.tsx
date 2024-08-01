import React from 'react';

function SkeletonLocalItem() {
  return (
    <div className="flex flex-col animate-pulse justify-center bg-gray-300 w-full h-[100px] rounded mb-5">
      <div className="bg-gray-200 w-1/2 h-[20px] my-3 ml-5 rounded"></div>
      <div className="bg-gray-200 w-1/2 h-[20px] ml-5 rounded"></div>
    </div>
  );
}

export default SkeletonLocalItem;
