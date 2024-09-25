import NaverMapContainer from "@/components/NaverMapContainer";
import NaverMapHeader from "@/components/NaverMapHeader";
import NaverMapLeftSide from "@/components/NaverMapLeftSide";

export default function Home() {
  return (
    <main className="relative">
      <NaverMapHeader />
      <NaverMapLeftSide />
      <NaverMapContainer />
    </main>
  );
}
