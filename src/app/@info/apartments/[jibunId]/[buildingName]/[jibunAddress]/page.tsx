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
  console.log(jibunResponse);

  console.log(
    `${jibunId} ${decodeURI(buildingName)} ${decodeURI(jibunAddress)}`
  );

  return (
    <div className="relative py-2 px-1 bg-red-300">
      <h2 className="relative text-center font-bold py-2 bg-red-300">
        <Link href="/" className="absolute left-0 top-1/2 translateY(-50">
          <ArrowLeft strokeWidth={1.5} size={25} />
        </Link>
        {decodeURI(buildingName)}
      </h2>
      <h3 className="text-center text-sm">{decodeURI(jibunAddress)}</h3>
    </div>
  );
}
