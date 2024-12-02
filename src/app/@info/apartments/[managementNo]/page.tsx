import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import PyungAccordion from "./components/PyungAccordion";
import { Suspense } from "react";
import PyungChart from "./components/PyungChart";
import PyungSelect from "./components/PyungSelect";
import PyungSelectSkeleton from "./components/PyungSelectSkeleton";
import PyungAccordionSelector from "./components/PyungAccordionSelector";
import PyungChartSkeleton from "./components/PyungChartSkeleton";
import { fetchJibunByManagementNo } from "@/api/data";

type Props = {
  params: {
    managementNo: string;
  };
};

export default async function ApartmentPage({
  params: { managementNo },
}: Props) {
  const response = await fetchJibunByManagementNo(managementNo);

  console.log("response", response);

  return (
    <div>
      <div className="bg-orange-500">
        <h2 className="relative text-center font-semibold py-2 text-white tracking-wide text-lg">
          <Link href="/" className="absolute left-2 top-1/2 -translate-y-1/2">
            <ArrowLeft strokeWidth={1.5} size={25} />
          </Link>
          {response.apartmentName}
        </h2>

        <h3 className="text-center text-sm text-white mb-2">
          {response.jibunAddress}
        </h3>

        <div className="h-10 border-t border-white flex items-center">
          <Suspense fallback={<PyungSelectSkeleton />}>
            <PyungSelect jibunId={managementNo} />
          </Suspense>
          <Separator orientation="vertical" className="bg-white" />
        </div>
      </div>
      <Suspense fallback={<PyungAccordionSelector />}>
        <PyungAccordion jibunId={managementNo} />
      </Suspense>

      <Suspense fallback={<PyungChartSkeleton />}>
        <PyungChart jibunId={managementNo} />
      </Suspense>
    </div>
  );
}
