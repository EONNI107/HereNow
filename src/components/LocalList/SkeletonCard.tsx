import React from 'react';

function SkeletonCard(): React.ReactElement {
  return (
    <div className="border rounded-3xl overflow-hidden shadow-xl relative w-[343px] h-[140px] xl:w-[399px] xl:h-[258px] animate-pulse">
      <div className="relative h-full xl:hidden">
        <div className="bg-gray3 w-full h-48"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray5 to-transparent flex flex-col justify-center p-4">
          <div className="max-w-[70%]">
            <div className="h-4 bg-gray0 w-1/3 mb-1 rounded"></div>
            <div className="h-6 bg-gray0 w-3/4 mb-1 rounded"></div>
          </div>
        </div>
      </div>

      <div className="hidden xl:flex flex-col h-full">
        <div className="bg-gray3 w-full h-[70%]"></div>
        <div className="flex items-center justify-between border-l border-r border-b rounded-b-xl bg-white p-3 h-[30%]">
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-gray2 w-[85%] rounded truncate"></div>
              <div className="h-6 w-6 bg-gray2 rounded-full ml-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
