import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const jibunResponse = await findJibunById(jibunId);
  const pyungs = jibunResponse.pyungs;
  const placeholder =
    pyungs.length > 0
      ? `${pyungs[0].exclusiveUseAreaInPyung}평 (${pyungs[0].dealAmountInOneHundredMillion}억 ${pyungs[0].floor}층)`
      : "데이터가 없습니다.";
  console.log(jibunResponse);

  return (
    <div>
      <div className="bg-orange-500 pb-2">
        <h2 className="relative text-center font-semibold py-2 text-white tracking-wider">
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
            <ArrowLeft strokeWidth={1.5} size={25} />
          </Link>
          {decodeURI(buildingName)}
        </h2>

        <h3 className="text-center text-sm text-white">
          {decodeURI(jibunAddress)}
        </h3>
      </div>
      <div className="flex">
        <div>
          <Select>
            <SelectTrigger className="w-[180px]">
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
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
