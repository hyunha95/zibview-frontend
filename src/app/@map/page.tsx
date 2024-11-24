import NaverMap from "@/components/NaverMap";
import { fetchCookies } from "@/lib/data";

export default async function MapPage() {
  const { anonymousUserUUID } = await fetchCookies();

  return (
    <>
      <NaverMap anonymousUserUUID={anonymousUserUUID} />
    </>
  );
}
