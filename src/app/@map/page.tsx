import NaverMap from "@/components/NaverMap";

export default async function MapPage() {
  const fetchCookies = async () => {
    const response = await fetch(
      "http://localhost:8080/api/auth/anonymous/cookies",
      { cache: "no-store" }
    );
    const body = await response.json();
    return body;
  };

  const { anonymousUserUUID } = await fetchCookies();

  return <NaverMap anonymousUserUUID={anonymousUserUUID} />;
}
