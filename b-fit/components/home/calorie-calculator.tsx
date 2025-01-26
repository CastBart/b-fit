import Image from "next/image";
export default function CalorieCounter() {
  return (
    <div
      id="caloriecalculator"
      className="flex flex-col lg:flex-row items-center justify-center py-20 text-white px-4 space-y-8 lg:space-y-0"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:order-2 text-center lg:text-left space-y-6 p-4">
        {/* Welcome Header */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Optimize Your <span className="text-[#5a7be9]">Nutrition </span>
          with Our Daily Calorie Intake Calculator
        </h1>
        {/* Short Description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Discover the perfect balance for your fitness goals by calculating
          your daily calorie needs. Whether you're building muscle, losing
          weight, or maintaining your health, our tool provides personalized
          insights for optimal nutrition.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 lg:order-1 p-4">
        {/* Add an illustration or keep empty for now */}
        {/* Placeholder for future content */}
        <div className="w-full h-full">
          <Image src="/CalorieCounter.jpg" width={600} height={600} alt="Login" className="w-full h-full object-contain rounded-full"/>
          {/* <img
            src="/CalorieCounter.jpg"
            alt="Login"
            className="w-full h-full object-contain rounded-full"
          /> */}
        </div>
      </div>
    </div>
  );
}
