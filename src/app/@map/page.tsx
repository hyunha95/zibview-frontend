import NaverMap from "@/components/NaverMap";

export default async function MapPage() {
  await fetch("http://localhost:8080/api/auth/anonymous/cookies");

  return <NaverMap />;
}
