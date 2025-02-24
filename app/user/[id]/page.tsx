import { getUserById } from "@/api/user-api";
import { Header } from "@/components/header";
import { UserGameTabs } from "@/components/user-game-tabs";
import { UserProfileSidebar } from "@/components/user-profile-sidebar";
import * as Tabs from "@radix-ui/react-tabs";

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getUserById(Number(id));

  return (
    <div>
      <Header />
      <Tabs.Root
        defaultValue="wish"
        className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 max-md:grid-cols-1 container"
      >
        <UserProfileSidebar profile={data} />
        <UserGameTabs />
      </Tabs.Root>
    </div>
  );
}
