"use client";
import { GameCard } from "@/components/game-card";
import * as Tabs from "@radix-ui/react-tabs";
import { useUserStore } from "@/store/user-store";
import { useGameStore } from "@/store/game-store";
import { useUserGameStore } from "@/store/user-game-store";

export const UserGameTabs = () => {
  const profile = useUserStore((state) => state.profile);
  const games = useGameStore((state) => state.games);
  const lists = useUserGameStore((state) => state.lists);
  const userGames = useUserGameStore((state) => state.userGames);

  return (
    <div className="col-span-5 max-[1200px]:col-span-3 max-md:col-span-1 md:my-12 mt-0 mb-12">
      {lists &&
        lists.map((l) => (
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
            value={l.name}
            key={l.id}
          >
            {userGames?.length === 0 ? (
              <p className="mt-10 text-xl text-white/60 h-full text-center">
                Здесь пусто
              </p>
            ) : (
              <>
                {userGames &&
                  userGames
                    .filter((ug) => ug.list.id === l.id)
                    .map((ug) => <GameCard key={ug.id} game={ug.game} />)}
              </>
            )}
          </Tabs.Content>
        ))}
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
