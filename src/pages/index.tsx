import DashBoardLayout from "@/components/layouts/DashBoard";
import Link from "next/link";


export default function Home() {
  return (
    <DashBoardLayout>
      <Link href="/projects" className="text-4xl font-bold ">Whereas recognition of the inherent dignity</Link>
    </DashBoardLayout>
  );
}
