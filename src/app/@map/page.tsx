import NaverMap from "@/components/NaverMap";
import { fetchCookies } from "@/lib/data";
import Script from "next/script";

export default async function MapPage() {
  const { anonymousUserUUID } = await fetchCookies();

  return (
    <>
      <NaverMap anonymousUserUUID={anonymousUserUUID} />
    </>
  );
}
