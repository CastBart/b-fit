import Image from "next/image";
import HomeHeader from "@/app/ui//Home/HomeHeader";
import CalorieCounter from "@/app/ui/Home/CalorieCalculator";
import SingleWourkout from "@/app/ui/Home/SingleWourkout";
import WorkoutPlan from "@/app/ui/Home/WorkoutPlan";
import Exercises from "@/app/ui/Home/Exercises";

export default function Home() {
  return (
    <div>
      <HomeHeader />
      <div className="max-w-[1240px] mx-auto px-4">
        <CalorieCounter />
        <Exercises />
        <SingleWourkout />
        <WorkoutPlan />
      </div>
    </div>
  );
}
