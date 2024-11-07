import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PyungAccordion from "./components/PyungAccordion";
import { Suspense } from "react";
import PyungChart from "./components/PyungChart";
import PyungSelect from "./components/PyungSelect";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import PyungSelectSkeleton from "./components/PyungSelectSkeleton";

type Props = {
  params: {
    jibunId: string;
    buildingName: string;
    jibunAddress: string;
  };
};

export default async function ApartmentPage({
  params: { jibunId, buildingName, jibunAddress },
}: Props) {
  return (
    <div>
      <div className="bg-orange-500">
        <h2 className="relative text-center font-semibold py-2 text-white tracking-wide text-lg">
          <Link href="/" className="absolute left-2 top-1/2 -translate-y-1/2">
            <ArrowLeft strokeWidth={1.5} size={25} />
          </Link>
          {decodeURI(buildingName)}
        </h2>

        <h3 className="text-center text-sm text-white mb-2">
          {decodeURI(jibunAddress)}
        </h3>

        <div className="h-10 border-t border-white flex items-center">
          <Suspense fallback={<PyungSelectSkeleton />}>
            <PyungSelect jibunId={jibunId} />
          </Suspense>
          <Separator orientation="vertical" className="bg-white" />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PyungAccordion jibunId={jibunId} />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <PyungChart jibunId={jibunId} />
      </Suspense>
    </div>
  );
}
