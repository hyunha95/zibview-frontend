import { findJibunById } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    jibunId: string;
  };
};

export default async function ApartmentPage({ params: { jibunId } }: Props) {
  const jibunResponse = await findJibunById(jibunId);

  console.log(jibunResponse);

  return (
    <div className="grid grid-cols-10 items-center py-2 px-1">
      <Link href="/" className="col-span-1 place-self-end">
        <ArrowLeft strokeWidth={1.5} size={25} />
      </Link>
    </div>
  );
}
