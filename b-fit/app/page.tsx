import HomeHeader from "@/components/home/home-header";
import CalorieCounter from "@/components/home/calorie-calculator";
import SingleWourkout from "@/components/home/single-wourkout";
import WorkoutPlan from "@/components/home/workout-plan";
import Exercises from "@/components/home/exercises";
import Welcome from "@/components/home/welcome";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <main id="home_page" className=" mx-auto bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]">
      <HomeHeader />
      <div className="flex max-w-[1240px] flex-col mx-auto px-4 ">
        <Welcome />
        <CalorieCounter />
        <Exercises />
        <SingleWourkout />
        <WorkoutPlan />
      </div>
      <Footer />
    </main>
  );
}
