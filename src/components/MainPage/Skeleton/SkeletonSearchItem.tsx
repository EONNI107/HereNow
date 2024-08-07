function SkeletonSearchItem() {
  return (
    <div className="flex animate-pulse bg-gray3 w-full h-[100px] rounded gap-4 mb-2">
      <div className="bg-gray0 w-[100px] h-[100px] rounded"></div>
      <div className="flex justify-between w-[218px] items-center">
        <div className="flex flex-col w-full">
          <div className="bg-gray0 w-3/4 h-4 mb-1"></div>
          <div className="bg-gray0 w-3/4 h-4"></div>
        </div>
        <div className="bg-gray0 h-[18px] w-[20px] rounded-full"></div>
      </div>
    </div>
  );
}

export default SkeletonSearchItem;
