"use client";
import { GameCard } from "@/components/game-card";
import * as Tabs from "@radix-ui/react-tabs";
import { useUserStore } from "@/store/user-store";
import { useGameStore } from "@/store/game-store";

export const UserGameTabs = () => {
  const profile = useUserStore((state) => state.profile);
  const games = useGameStore((state) => state.games);

  return (
    <div className="col-span-5 max-[1200px]:col-span-3 max-md:col-span-1 md:my-12 mt-0 mb-12">
      <Tabs.Content
        className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
        value="wish"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <GameCard key={item} />
        ))}
      </Tabs.Content>
      <Tabs.Content
        className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
        value="play"
      >
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <GameCard key={item} />
        ))}
      </Tabs.Content>
      <Tabs.Content
        className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
        value="finish"
      >
        {[1, 2].map((item) => (
          <GameCard key={item} />
        ))}
      </Tabs.Content>
      {games &&
      games.filter((games) => games?.user.id === profile?.user.id).length ===
        0 ? (
        <p className="mt-10 text-xl text-white/60 h-full text-center">
          Здесь пусто
        </p>
      ) : (
        <Tabs.Content
          className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
          value="add"
        >
          {games &&
            games
              .filter((games) => games?.user.id === profile?.user.id)
              .map((game) => <GameCard game={game} key={game?.id} />)}
        </Tabs.Content>
      )}
    </div>
  );
};
