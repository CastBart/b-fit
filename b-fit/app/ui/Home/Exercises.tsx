import SectionCard from "./SectionCard";

export default function Exercises() {
  return (
    <div
      id="exercises"
      className="flex flex-col lg:flex-row items-center justify-center py-20 text-white px-4 space-y-8 lg:space-y-0"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end lg:order-1 text-center lg:text-right space-y-6 p-4">
        {/* Welcome Header */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Expand Your <span className="text-[#5a7be9]">Exercise Library </span>
          and Elevate Your Workouts
        </h1>
        {/* Short Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Access a comprehensive exercise database tailored to your fitness
          goals. Whether you're a beginner or an expert, explore new techniques
          and master every movement with detailed guidance and insights.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 lg:order-2 p-4">
        {/* Add an illustration or keep empty for now */}
        {/* Placeholder for future content */}
        <div className="w-full h-full">
          <img
            src="/Exercise Library4.jpg"
            alt="Login"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
