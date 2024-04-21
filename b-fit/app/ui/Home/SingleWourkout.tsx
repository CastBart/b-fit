import SectionCard from "./SectionCard";

export default function SingleWourkout() {
  return (
    <div id="singleworkouts" className="min-h-screen pt-[70px]">
      <h1 className="text-2xl pb-6">Creating your own Workouts</h1>
      <SectionCard>
        <h3 className="text-xl pb-2 px-4">
          Welcome to the Ultimate Workout Customization Experience
        </h3>
        <p className="p-4">
          Welcome to the ultimate workout customization experience! Our platform
          empowers users to take control of their fitness journey like never
          before. With our innovative feature, you can create personalized
          workouts tailored to your specific needs and preferences.
        </p>
        <h3 className="text-xl pb-2 px-4">Versatile Exercise Selection</h3>
        <p className="p-4">
          The heart of this feature lies in its versatility. Users have access
          to a vast library of exercises already available on the platform,
          covering a wide range of muscle groups, intensity levels, and fitness
          goals. But what truly sets us apart is the ability to add your own
          custom exercises. Whether it's a unique move you've devised or a
          favorite routine from your personal trainer, you can seamlessly
          integrate it into your workout repertoire.
        </p>
        <h3 className="text-xl pb-2 px-4">Seamless Workout Creation</h3>
        <p className="p-4">
          Creating your perfect workout is as easy as pie. Our intuitive
          interface allows you to browse through exercises, select the ones that
          resonate with you, and organize them into a cohesive routine. You have
          full control over sets, reps, rest intervals, and more, ensuring that
          every aspect of your workout aligns with your goals and preferences.
        </p>
        <h3 className="text-xl pb-2 px-4">
          Personalized and Adaptive Fitness Journey
        </h3>
        <p className="p-4">
          But the customization doesn't stop there. Our platform remembers your
          favorite exercises and routines, making it easy to revisit and modify
          them whenever inspiration strikes. Whether you're a fitness novice
          exploring different workout styles or a seasoned athlete fine-tuning
          your training regimen, our feature adapts to your evolving needs,
          empowering you to achieve your fitness goals with confidence and
          creativity.
        </p>
      </SectionCard>
    </div>
  );
}
