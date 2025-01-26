import { websiteLinks } from "../../lib/definitions";
import SectionCard from "../../components/home/section-card";

export default function WelcomePage(): React.ReactNode {
  return (
    <main
      id="welcome_page"
      className="bg-[#0F172A] flex items-center justify-center min-h-screen"
    >
      <div className="max-w-[1080px] flex flex-col items-center mx-auto px-4">
        <h1 className="text-center text-4xl pb-8">Welcome!</h1>
        <SectionCard>
          <p className="p-4">
            Welcome to <b>B-Fit</b>! We're thrilled to have you join our
            community dedicated to helping you achieve your fitness goals. With
            personalized features like our Daily Calorie Intake Calculator and
            Exercise Creation tool, you're empowered to tailor your fitness
            journey. Let's make every step count together
          </p>
        </SectionCard>
        <a
          className="hidden md:block p-4 hover:bg-[#5a7be9] rounded-xl cursor-pointer duration-300 hover:text-black"
          href={websiteLinks.login.link}
        >
          Login/Sign Up
        </a>
      </div>
    </main>
  );
}
