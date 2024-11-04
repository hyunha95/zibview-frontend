import NaverMap from "@/components/NaverMap";

export default async function Default() {
  const fetchCookies = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/api/auth/anonymous/cookies",
      { cache: "no-store" }
    );
    const body = await response.json();
    return body;
  };

  const { anonymousUserUUID } = await fetchCookies();

  return <NaverMap anonymousUserUUID={anonymousUserUUID} />;
}
