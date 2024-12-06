import Button from "../Button";
import SectionCard from "./SectionCard";

export default function Welcome() {
  return (
    <div id="welcome" className="flex ">
      <div className="w-1/2">
        <h1 className="text-3xl">Track Your Fitness Journey Effortlessly</h1>
        <Button children="Learn More"/>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}
