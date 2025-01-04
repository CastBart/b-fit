import SectionCard from "./SectionCard";

export default function Exercises() {
  return (
    <div
      id="exercises"
      className="flex flex-col lg:flex-row items-center justify-center pt-20 text-white px-4 space-y-8 lg:space-y-0"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:order-1 text-center lg:text-left space-y-6 p-4">
        {/* Welcome Header */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Optimize Your <span className="text-[#5a7be9]">Nutrition </span>
          with Our Daily Calorie Intake Calculator
        </h1>
        {/* Welcome Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-xl">
          Discover the perfect balance for your fitness goals by calculating
          your daily calorie needs. Whether you're building muscle, losing
          weight, or maintaining your health, our tool provides personalized
          insights for optimal nutrition.
        </p>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 lg:order-2 p-4">
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

      // <h1 className="text-2xl pb-6">Custom Exercises Creation</h1>
      // <SectionCard>
      //   <h3 className="text-xl pb-2 px-4">
      //     Create Your Perfect Workout with Custom Exercises
      //   </h3>
      //   <p className="p-4">
      //     Take your fitness journey into your own hands with our innovative
      //     Exercise Creation feature. Designed with flexibility and customization
      //     in mind, this tool empowers you to tailor your workouts to meet your
      //     unique needs and preferences. Whether you're a seasoned gym-goer or
      //     just starting out, creating personalized exercises has never been
      //     easier.
      //   </p>
      //   <h3 className="text-xl pb-2 px-4">Unleash Your Creativity</h3>
      //   <p className="p-4">
      //     Don't let limitations hold you back. With our Exercise Creation
      //     feature, you have the freedom to design exercises that perfectly align
      //     with your fitness goals and target areas of focus. Whether you're
      //     looking to strengthen specific muscle groups, improve flexibility, or
      //     enhance endurance, the possibilities are endless.
      //   </p>
      //   <h3 className="text-xl pb-2 px-4">Simple and Intuitive Interface</h3>
      //   <p className="p-4">
      //     Creating custom exercises is a breeze with our user-friendly
      //     interface. Just input the exercise name, specify the primary muscle it
      //     targets, and indicate the equipment needed—no technical expertise
      //     required. Our streamlined process ensures that you can bring your
      //     exercise ideas to life in just a few simple steps.
      //   </p>
      //   <h3 className="text-xl pb-2 px-4">Expand Your Fitness Arsenal</h3>
      //   <p className="p-4">
      //     Discover new ways to challenge your body and keep your workouts fresh
      //     and exciting. With the power to create custom exercises, you can
      //     continuously expand your fitness arsenal and explore innovative
      //     movements that push your limits and drive results. Whether you're
      //     looking to spice up your routine or add variety to your training
      //     regimen, our Exercise Creation feature has you covered.
      //   </p>
      // </SectionCard>