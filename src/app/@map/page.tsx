import NaverMap from "@/components/NaverMap";
import { fetchCookies } from "@/lib/data";
import Script from "next/script";

export default async function MapPage() {
  const { anonymousUserUUID } = await fetchCookies();

  return (
    <>
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
      ></Script>
      <NaverMap anonymousUserUUID={anonymousUserUUID} />
    </>
  );
}
