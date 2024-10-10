import LineChartLabel from "@/components/charts/LineChartLabel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { findJibunById } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

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
  const response = await findJibunById(jibunId);
  const pyungs = response.pyungs;
  const placeholder =
    pyungs.length > 0
      ? `${pyungs[0].exclusiveUseAreaInPyung}평 (${pyungs[0].dealAmountInOneHundredMillion}억 ${pyungs[0].floor}층)`
      : "데이터가 없습니다.";
  console.log(response);

  return (
    <div>
      <div className="bg-orange-500">
        <h2 className="relative text-center font-semibold py-2 text-white tracking-wide">
          <Link href="/" className="absolute left-2 top-1/2 -translate-y-1/2">
            <ArrowLeft strokeWidth={1.5} size={25} />
          </Link>
          {decodeURI(buildingName)}
        </h2>

        <h3 className="text-center text-sm text-white mb-2">
          {decodeURI(jibunAddress)}
        </h3>

        <div className="h-10 border-t border-white flex items-center">
          <Select>
            <SelectTrigger className="w-1/2 h-full border-none shadow-none rounded-none focus:ring-0 text-white">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {pyungs.map((pyung) => (
                <SelectItem
                  key={pyung.transactionApartmentId}
                  value={pyung.transactionApartmentId.toString()}
                >
                  {pyung.exclusiveUseAreaInPyung}평 (
                  {pyung.dealAmountInOneHundredMillion}억 {pyung.floor}층)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Separator orientation="vertical" className="bg-white" />
        </div>
      </div>
      <Accordion type="single" collapsible className="pl-4 pr-2">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-500">
            {response.houseHoldCount}세대
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <LineChartLabel />
    </div>
  );
}
