import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl uppercase">My projects</h2>
        <Button className="gap-2">
          <PackagePlus className="w-4 h-4" />
          <span>New Project</span>
        </Button>
      </div>

    </>
  );
}
