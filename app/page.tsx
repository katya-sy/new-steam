import { FilterSidebar } from "@/components/filter-sidebar";
import { Header } from "@/components/header";
import { HomeGameList } from "@/components/home-game-list";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 container">
        <FilterSidebar />
        <div className="col-span-5 max-[1200px]:col-span-3 my-12">
          <HomeGameList />
        </div>
      </div>
    </div>
  );
}
