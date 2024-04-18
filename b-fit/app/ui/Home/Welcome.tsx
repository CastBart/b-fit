import SectionCard from "./SectionCard";

export default function Welcome() {
  return (
    <div id="home" className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl pb-6 text-center" >Welcome to <b>B-Fit</b></h1>
      <SectionCard>
        <p className="p-4">
          At <b>B-Fit</b>, we're passionate about empowering individuals
          like you to unlock your full potential and achieve your fitness
          aspirations. Whether you're striving to shed a few pounds, build
          muscle, or simply adopt a healthier lifestyle, our platform is your
          ultimate companion on your wellness journey.
        </p>
        <br />
        <p className="p-4">
          Step into a world of personalized fitness solutions with our
          innovative features designed to cater to your unique needs. From our
          Daily Calorie Intake Calculator, which provides tailored nutrition
          guidance based on your individual profile, to our Exercise Creation
          tool, allowing you to craft custom workouts that target your specific
          goals, we're here to support you every step of the way.
        </p>
        <br />
        <p className="p-4">
          Join our community of like-minded individuals committed to living
          their best lives. With <b>B-Fit</b>, you're not just embarking
          on a fitness journey; you're embracing a lifestyle of wellness,
          empowerment, and endless possibilities. Welcome home to a healthier,
          happier you!
        </p>
      </SectionCard>
    </div>
  );
}
