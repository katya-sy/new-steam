import { getUserById, getUserScores } from "@/api/user-api";
import { Header } from "@/components/header";
import { UserProfileSidebar } from "@/components/user-profile-sidebar";
import * as Tabs from "@radix-ui/react-tabs";
import { getLists, getOtherUserGames, getUserGames } from "@/api/user-game-api";
import { getGames } from "@/api/game-api";
import { OtherUserGameTabs } from "@/components/other-user-game-tabs";

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getUserById(Number(id));
  const listRes = await getLists();
  const otherUserGamesRes = await getOtherUserGames(Number(id));
  const gameRes = await getGames();
  const userGamesRes = await getUserGames();
  const userScoreRes = await getUserScores();

  return (
    <div>
      <Header />
      <Tabs.Root
        defaultValue="add"
        className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 max-md:grid-cols-1 container"
      >
        <UserProfileSidebar
          userScoresData={userScoreRes?.data}
          profile={data}
          gameData={gameRes?.data}
          listsData={listRes?.data}
          otherUserGamesData={otherUserGamesRes?.data}
          userGamesData={userGamesRes?.data}
        />
        <OtherUserGameTabs profile={data} />
      </Tabs.Root>
    </div>
  );
}
