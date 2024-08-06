function FeedItemSkeleton() {
  return (
    <div className="p-4 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-gray-200 mr-4 animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="relative h-48 bg-gray-200 rounded-3xl animate-pulse"></div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

export default FeedItemSkeleton;
