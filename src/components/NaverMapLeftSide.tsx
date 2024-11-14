import Menu from "@/app/@info/components/Menu";
import News from "@/app/@info/components/News";
import RealTimeRanking from "@/app/@info/components/RealTimeRanking";
import Search from "@/app/@info/components/Search";
import { AlignJustify, Bell } from "lucide-react";

export default function NaverMapLeftSide() {
  return (
    <div className="p-4 grid gap-y-3">
      <div className="flex justify-between">
        <Menu />
        <Bell />
      </div>
      <Search />
      <RealTimeRanking />
      <News />
    </div>
  );
}
