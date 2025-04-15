import { Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Construction className="w-16 h-16 text-yellow-500 mb-4" />
      <h1 className="text-3xl font-semibold mb-2">Page Under Construction</h1>
      <p className="text-muted-foreground max-w-md">
        We're working hard to bring this page to life. Please check back soon!
      </p>
    </div>
  );
}