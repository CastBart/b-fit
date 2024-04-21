import Image from "next/image";
import HomeHeader from "@/app/ui//Home/HomeHeader";
import CalorieCounter from "@/app/ui/Home/CalorieCalculator";
import SingleWourkout from "@/app/ui/Home/SingleWourkout";
import WorkoutPlan from "@/app/ui/Home/WorkoutPlan";
import Exercises from "@/app/ui/Home/Exercises";
import Welcome from "./ui/Home/Welcome";

export default function Home() {
  return (
    <div className="bg-[#0F172A]">
      <HomeHeader />
      <div className="max-w-[1080px] flex flex-col mx-auto px-4">
        <Welcome />
        <CalorieCounter />
        <Exercises />
        <SingleWourkout />
        <WorkoutPlan />
      </div>
    </div>
  );
}
