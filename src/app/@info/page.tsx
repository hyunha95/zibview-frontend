import NaverMapLeftSide from "@/components/NaverMapLeftSide";
import Script from "next/script";

export default async function InfoSideBar() {
  return (
    <>
      <Script
        type="text/javascript"
        strategy="beforeInteractive"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}&submodules=geocoder`}
      ></Script>
      <NaverMapLeftSide />
    </>
  );
}
