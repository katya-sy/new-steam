import { getStatuses } from "@/api/status-api";
import { getTags } from "@/api/tag-api";
import { getProfile } from "@/api/user-api";
import { Header } from "@/components/header";
import { ProfileSidebar } from "@/components/profile-sidebar";
import { UserGameTabs } from "@/components/user-game-tabs";
import * as Tabs from "@radix-ui/react-tabs";
import { getGames } from "@/api/game-api";

export default async function Profile() {
  const { data } = await getProfile();
  const statusRes = await getStatuses();
  const tagRes = await getTags();
  const gameRes = await getGames();

  return (
    <div>
      <Header />
      <Tabs.Root
        defaultValue="add"
        className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 max-md:grid-cols-1 container"
      >
        <ProfileSidebar
          profile={data}
          statuses={statusRes.data}
          tags={tagRes.data}
          gameData={gameRes?.data}
        />
        <UserGameTabs />
      </Tabs.Root>
    </div>
  );
}
