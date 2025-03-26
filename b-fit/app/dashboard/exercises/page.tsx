

import Exercises from "@/components/exercises/exercises";

export default function Page() {
  return (
    <div className="max-w-[600px] mx-auto">
      <div className="flex flex-col border rounded-3xl p-4 my-10 h-[calc(100vh-9rem)] m-2">
        <Exercises containerStyleClass="w-full" mode="view"/>
      </div>
    </div>
  );
}
