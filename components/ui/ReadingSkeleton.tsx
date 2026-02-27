export const ReadingSkeleton = () => (
  <div className="animate-pulse space-y-4 w-full mt-8">
    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-5/6"></div>
    </div>
    <div className="h-6 bg-gray-700 rounded w-1/2 mt-8"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-800 rounded w-full"></div>
      <div className="h-4 bg-gray-800 rounded w-full"></div>
    </div>
  </div>
);
