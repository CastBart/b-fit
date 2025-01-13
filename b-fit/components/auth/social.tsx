"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

export default function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline">
        <FaGoogle className="w-5 h-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline">
        <FaFacebook className="w-5 h-5" />
      </Button>
    </div>
  );
}
