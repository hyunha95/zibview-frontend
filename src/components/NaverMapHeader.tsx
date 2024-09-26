import { HousePlug } from "lucide-react";

export default function NaverMapHeader() {
  return (
    <div className="h-14 w-full bg-orange-400 absolute top-0 left-0 z-50 flex items-center">
      <div className="ml-2 p-1 border-2 border-orange-600 rounded-full">
        <HousePlug className="text-orange-600" />
      </div>
    </div>
  );
}
