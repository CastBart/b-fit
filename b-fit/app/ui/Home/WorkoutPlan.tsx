import SectionCard from "./SectionCard";

export default function WorkoutPlan() {
  return (
    <div
      id="workoutplans"
      className="flex flex-col lg:flex-row items-center justify-center py-20 text-white px-4 space-y-8 lg:space-y-0"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end lg:order-1 text-center lg:text-right space-y-6 p-4">
        {/* Welcome Header */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Build Personalized{" "}
          <span className="text-[#5a7be9]">Workout Plans </span>
          and Crush Your Fitness Goals
        </h1>
        {/* Short Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Transform your fitness routine by creating customized workout plans
          tailored to your goals. Group multiple single workouts into a
          structured plan designed for a set number of weeks, ensuring
          consistency, progress tracking, and maximum results.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 lg:order-2 p-4">
        {/* Add an illustration or keep empty for now */}
        {/* Placeholder for future content */}
        <div className="w-full h-full">
          <img
            src="/WorkoutPlan5.jpg"
            alt="Login"
            className="w-full h-full object-contain rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
