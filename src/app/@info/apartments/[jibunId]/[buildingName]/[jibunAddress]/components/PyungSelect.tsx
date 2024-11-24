import { fetchJibunById } from "@/api/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  jibunId: string;
};

export default async function PyungSelect({ jibunId }: Props) {
  const response = await fetchJibunById(jibunId);
  const pyungs = response.pyungs || [];
  const placeholder =
    pyungs && pyungs.length > 0
      ? `${pyungs[0].exclusiveUseAreaInPyung}평 (${pyungs[0].dealAmountInOneHundredMillion}억 ${pyungs[0].floor}층)`
      : "데이터가 없습니다.";

  return (
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
  );
}
