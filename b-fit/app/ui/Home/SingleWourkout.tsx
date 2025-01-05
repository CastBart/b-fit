import SectionCard from "./SectionCard";

export default function SingleWourkout() {
  return (
    <div
      id="singleworkouts"
      className="flex flex-col lg:flex-row items-center justify-center py-20 text-white px-4 space-y-8 lg:space-y-0"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:order-2 text-center lg:text-left space-y-6 p-4">
        {/* Welcome Header */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Master Every <span className="text-[#5a7be9]">Workout </span>
          with Precision and Confidence
        </h1>
        {/* Short Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Unlock your full potential with personalized single workout plans.
          Tailored to your fitness level, these workouts ensure every session is
          impactful, efficient, and aligned with your goals. Create your plan
          before your session begins or on the go, enabling you to track your
          lifts and monitor your progression effectively.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 lg:order-1 p-4">
        {/* Add an illustration or keep empty for now */}
        {/* Placeholder for future content */}
        <div className="w-full h-full">
          <img
            src="/SingleWourkout4.jpg"
            alt="Login"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
