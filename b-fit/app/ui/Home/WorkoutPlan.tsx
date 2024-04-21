import SectionCard from "./SectionCard";

export default function WorkoutPlan() {
  return (
    <div id="workoutplans" className="min-h-screen pt-[70px]">
      <h1 className="text-2xl pb-6">Workout Plan Section</h1>
      <SectionCard>
        <h3 className="text-xl pb-2 px-4">
          Introducing Workout Plan: Tailored Fitness at Your Fingertips
        </h3>
        <p className="p-4">
          Welcome to Workout Plan, where personalized fitness meets seamless
          organization. Our feature empowers users to craft comprehensive
          workout plans tailored to their unique goals and schedules. With the
          flexibility to add both existing platform exercises and custom
          routines, achieving your fitness aspirations has never been easier.
        </p>
        <h3 className="text-xl pb-2 px-4">Customizable Daily Workouts</h3>
        <p className="p-4">
          Workout Plan streamlines your fitness journey by breaking it down into
          manageable daily workouts. Users can create plans spanning any number
          of days, each designated as its own workout session. Whether you're
          aiming for a week-long intensive program or a month of gradual
          progression, our feature adapts to your timeframe with ease.
        </p>
        <h3 className="text-xl pb-2 px-4">Endless Exercise Options</h3>
        <p className="p-4">
          Unlock a world of exercise possibilities with our extensive library of
          pre-existing workouts. From strength training to cardio and
          flexibility, we've curated a diverse selection to suit every fitness
          need. But why stop there? With the Workout Plan feature, users have
          the freedom to inject their own creativity by incorporating custom
          exercises. Whether it's a signature move from your favorite fitness
          influencer or a routine devised by your personal trainer, the choice
          is yours.
        </p>
        <h3 className="text-xl pb-2 px-4">
          Effortless Planning and Organization
        </h3>
        <p className="p-4">
          Crafting your ideal workout plan is a breeze with our intuitive
          interface. Simply select the desired number of days for your plan,
          then populate each day's workout with exercises from our library or
          your own custom creations. Drag and drop functionality allows for
          seamless arrangement, while easy editing ensures you can adapt your
          plan as your fitness goals evolve.
        </p>
        <h3 className="text-xl pb-2 px-4">
          Take Control of Your Fitness Journey
        </h3>
        <p className="p-4">
          With the Workout Plan feature, the power to design your fitness
          destiny is in your hands. Whether you're a seasoned athlete seeking
          structure or a beginner embarking on your fitness odyssey, our feature
          provides the tools you need to succeed. Say goodbye to cookie-cutter
          routines and hello to a tailored workout experience that empowers you
          to reach new heights of strength, endurance, and vitality.
        </p>
      </SectionCard>
    </div>
  );
}
