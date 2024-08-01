export default function WorkoutCardSkeleton(): React.ReactNode {
    return (
      <div className="bg-gray-700 text-white rounded-lg p-6 text-center animate-pulse">
        <div className="h-6 bg-gray-600 rounded mb-4"></div>
        <div className="h-4 bg-gray-600 rounded mb-4"></div>
        <div className="h-8 bg-blue-600 rounded"></div>
      </div>
    );
  }