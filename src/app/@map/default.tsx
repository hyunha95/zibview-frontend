import NaverMap from "@/components/NaverMap";

export default async function Default() {
  const fetchCookies = async () => {
    const response = await fetch(
      "http://localhost:8080/api/auth/anonymous/cookies"
    );
    const body = await response.json();
    return body;
  };

  const { anonymousUserUUID } = await fetchCookies();

  return <NaverMap anonymousUserUUID={anonymousUserUUID} />;
}
