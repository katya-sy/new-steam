import { getGames, getGameScores } from "@/api/game-api";
import { Header } from "@/components/header";
import { HomeGameList } from "@/components/home-game-list";
import { SidebarWrapper } from "@/components/sidebar-wrapper";
import { getTags } from "@/api/tag-api";
import { getLists, getUserGames } from "@/api/user-game-api";

export default async function Home() {
  const { data, error } = await getGames();
  const tagRes = await getTags();
  const gameScoreRes = await getGameScores();
  const listRes = await getLists();
  const userGamesRes = await getUserGames();

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
        <SidebarWrapper data={tagRes?.data} />
        <div className="col-span-5 max-[1200px]:col-span-3 max-md:col-span-1 md:my-12 mt-0 mb-12">
          <HomeGameList
            data={data}
            gameScores={gameScoreRes?.data}
            listsData={listRes?.data}
            userGamesData={userGamesRes?.data}
          />
        </div>
      </div>
    </div>
  );
}
