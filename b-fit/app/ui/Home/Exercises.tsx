import SectionCard from "./SectionCard";

export default function Exercises() {
  return (
    <div id="exercises" className="min-h-screen pt-[70px]">
      <h1 className="text-2xl pb-6">Custom Exercises Creation</h1>
      <SectionCard>
        <h3 className="text-xl pb-2 px-4">
          Create Your Perfect Workout with Custom Exercises
        </h3>
        <p className="p-4">
          Take your fitness journey into your own hands with our innovative
          Exercise Creation feature. Designed with flexibility and customization
          in mind, this tool empowers you to tailor your workouts to meet your
          unique needs and preferences. Whether you're a seasoned gym-goer or
          just starting out, creating personalized exercises has never been
          easier.
        </p>
        <h3 className="text-xl pb-2 px-4">Unleash Your Creativity</h3>
        <p className="p-4">
          Don't let limitations hold you back. With our Exercise Creation
          feature, you have the freedom to design exercises that perfectly align
          with your fitness goals and target areas of focus. Whether you're
          looking to strengthen specific muscle groups, improve flexibility, or
          enhance endurance, the possibilities are endless.
        </p>
        <h3 className="text-xl pb-2 px-4">Simple and Intuitive Interface</h3>
        <p className="p-4">
          Creating custom exercises is a breeze with our user-friendly
          interface. Just input the exercise name, specify the primary muscle it
          targets, and indicate the equipment needed—no technical expertise
          required. Our streamlined process ensures that you can bring your
          exercise ideas to life in just a few simple steps.
        </p>
        <h3 className="text-xl pb-2 px-4">Expand Your Fitness Arsenal</h3>
        <p className="p-4">
          Discover new ways to challenge your body and keep your workouts fresh
          and exciting. With the power to create custom exercises, you can
          continuously expand your fitness arsenal and explore innovative
          movements that push your limits and drive results. Whether you're
          looking to spice up your routine or add variety to your training
          regimen, our Exercise Creation feature has you covered.
        </p>
      </SectionCard>
    </div>
  );
}
