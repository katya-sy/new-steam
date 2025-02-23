import { getGames } from "@/api/game-api";
import { Header } from "@/components/header";
import { HomeGameList } from "@/components/home-game-list";
import { SidebarWrapper } from "@/components/sidebar-wrapper";

export default async function Home() {
  const { data, error } = await getGames();

  if (!data) {
    return (
      <p>
        {error?.message}: {error?.statusCode}
      </p>
    );
  }

  return (
    <div>
      <Header />
      <div className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 max-md:grid-cols-1 container">
        <SidebarWrapper />
        <div className="col-span-5 max-[1200px]:col-span-3 max-md:col-span-1 md:my-12 mt-0 mb-12">
          <HomeGameList data={data} />
        </div>
      </div>
    </div>
  );
}
