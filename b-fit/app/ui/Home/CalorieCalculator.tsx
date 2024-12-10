export default function CalorieCounter() {
  return (
    <div
      id="caloriecalculator"
      className="flex flex-col lg:flex-row items-center justify-center pt-20 text-white px-4 space-y-8 lg:space-y-0"
    >
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start lg:order-2 text-center lg:text-left space-y-6 p-4">
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
      <div className="lg:w-1/2 lg:order-1 p-4">
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

{
  /* <SectionCard>
  <h3 className="text-xl pb-2 px-4">
    Optimize Your Nutrition with Our Daily Calorie Intake Calculator
  </h3>
  <p className="p-4">
    Unlock the key to achieving your fitness goals with precision and ease
    using our innovative Daily Calorie Intake Calculator. Whether you're
    aiming to shed pounds, maintain your current weight, or pack on
    muscle, our intuitive tool empowers you to tailor your nutrition plan
    to your unique needs.
  </p>
  <h3 className="text-xl pb-2 px-4">Personalized Nutrition Guidance</h3>
  <p className="p-4">
    Say goodbye to generic calorie recommendations! Our calculator takes
    into account essential factors such as age, gender, weight, height,
    activity level, and fitness goal to provide you with a personalized
    daily calorie target. By leveraging advanced algorithms, we ensure
    that your nutrition plan aligns perfectly with your objectives.
  </p>
  <h3 className="text-xl pb-2 px-4">Streamlined Input Process</h3>
  <p className="p-4">
    Inputting your information is a breeze. Our user-friendly interface
    guides you through the process step-by-step, allowing you to
    effortlessly enter your details and preferences. With just a few
    clicks, you'll gain access to invaluable insights that will fuel your
    journey to a healthier you.
  </p>
  <h3 className="text-xl pb-2 px-4">Tailored Fitness Goals</h3>
  <p className="p-4">
    Whether you're looking to shed unwanted pounds, maintain your current
    physique, or sculpt lean muscle, our calculator caters to your
    specific fitness aspirations. Simply select your desired goal—weight
    loss, maintenance, or muscle gain—and let our tool do the rest,
    providing you with a targeted calorie intake recommendation.
  </p>
  <h3 className="text-xl pb-2 px-4">Empowerment through Knowledge</h3>
  <p className="p-4">
    Understanding your body's calorie needs is the first step toward
    achieving your wellness goals. Our calculator not only delivers a
    precise calorie target but also equips you with the knowledge you need
    to make informed decisions about your nutrition. With greater insight
    into your dietary requirements, you'll be better equipped to optimize
    your eating habits and fuel your body for success.
  </p>
</SectionCard> */
}
