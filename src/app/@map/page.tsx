import { fetchCookies } from "@/api/data";
import NaverMap from "@/components/NaverMap";

export default async function MapPage() {
  const { anonymousUserUUID } = await fetchCookies();

  return <NaverMap anonymousUserUUID={anonymousUserUUID} />;
}
