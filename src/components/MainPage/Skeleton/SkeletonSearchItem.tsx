function SkeletonSearchItem() {
  return (
    <div className="flex animate-pulse bg-gray-300 w-full h-[100px] rounded gap-4 mb-2">
      <div className="bg-gray-200 w-[100px] h-[100px] rounded"></div>
      <div className="flex justify-between w-[218px] items-center">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-3/4 h-4 mb-1"></div>
          <div className="bg-gray-200 w-3/4 h-4"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonSearchItem;
