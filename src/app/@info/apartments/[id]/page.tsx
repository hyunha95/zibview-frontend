import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default async function ApartmentPage({ params: { id } }: Props) {
  console.log(id);
  return (
    <div className="grid grid-cols-10 items-center border-b border-orange-400 py-4 px-2">
      <Link href="/" className="col-span-1 place-self-end">
        <ArrowLeft strokeWidth={1} size={30} />
      </Link>
    </div>
  );
}
