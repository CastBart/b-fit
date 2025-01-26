import { Button } from "@/components/ui/button";
export default function Welcome() {
  return (
    <div
      id="welcome"
      className="flex flex-col lg:flex-row items-center justify-center lg:min-h-screen text-white px-4"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end text-center lg:text-right space-y-12 p-4">
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
        <Button size="lg">
          Learn More
        </Button>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 p-4">
        {/* Add an illustration or keep empty for now */}
        {/* Placeholder for future content */}
        <div className="w-full h-full">
          <img 
            src="/BartFitness-Login.png"
            alt="Login"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
