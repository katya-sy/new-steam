import { GameCard } from "@/components/game-card";
import { Header } from "@/components/header";
import { ProfileSidebar } from "@/components/profile-sidebar";
import * as Tabs from "@radix-ui/react-tabs";

export default function User() {
  return (
    <div>
      <Header />
      <Tabs.Root
        defaultValue="wish"
        className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 container"
      >
        <ProfileSidebar />
        <div className="col-span-5 max-[1200px]:col-span-3 my-12">
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-lg:grid-cols-3"
            value="wish"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-lg:grid-cols-3"
            value="play"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-lg:grid-cols-3"
            value="finish"
          >
            {[1, 2].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-lg:grid-cols-3"
            value="add"
          >
            {[1, 2, 3].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
