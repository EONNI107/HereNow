function SkeletonSearchItem() {
  return (
    <div className="flex animate-pulse bg-gray-300 w-full h-[100px] rounded mb-3">
      <div className="bg-gray-200 w-[100px] h-[100px] rounded "></div>
      <div className="flex justify-between w-[300px] items-center px-4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-3/4 h-4 mb-1"></div>
          <div className="bg-gray-200 w-3/4 h-4"></div>
        </div>
        <div className="bg-gray-200 h-[20px] w-[20px] ml-5 rounded-full"></div>
      </div>
    </div>
  );
}

export default SkeletonSearchItem;
