import Button from "../Button";

export default function Welcome() {
  return (
    <div
      id="welcome"
      className="flex items-center justify-center lg:min-h-screen text-white px-4"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right space-y-12 px-4">
        {/* Welcome Header */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Track Your Fitness Journey <br />
          <span className="text-[#5a7be9]">Effortlessly</span>
        </h1>

        {/* Welcome Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Create workouts, build custom workout plans, extend your exercise
          library, and calculate your daily calories in one platform.
        </p>

        {/* Action Button */}
        <Button size="large">
          Learn More
        </Button>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2">
        {/* Add an illustration or keep empty for now */}
        {/* Placeholder for future content */}
      </div>
    </div>
  );
}
