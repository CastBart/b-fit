import Image from "next/image";
import HomeHeader from "@/app/ui//Home/HomeHeader";
import CalorieCounter from "@/app/ui/Home/CalorieCalculator";
import SingleWourkout from "@/app/ui/Home/SingleWourkout";
import WorkoutPlan from "@/app/ui/Home/WorkoutPlan";
import Exercises from "@/app/ui/Home/Exercises";
import Welcome from "./ui/Home/Welcome";
import Footer from "./ui/Home/Footer";

export default function Home() {
  return (
    <main id="home_page" className=" mx-auto">
      <HomeHeader />
      <div className="flex max-w-[1240px] flex-col mx-auto px-4">
        <Welcome />
        <CalorieCounter />
        <Exercises />
      </div>
      <Footer />
    </main>
  );
}
