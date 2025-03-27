"use client";
import { Game, GameScore, GameStatistic } from "@/types/game-type";
import Image from "next/image";
import Link from "next/link";
import { dateFormatter } from "@/lib/date-formatter";
import { BASE_URL } from "@/lib/consts";
import { useGameStore } from "@/store/game-store";
import { useEffect } from "react";
import { GameRating } from "@/components/game-rating";
import { CreateUserGameForm } from "@/components/create-user-game-form";
import { useUserGameStore } from "@/store/user-game-store";
import { ListType, UserGame } from "@/types/user-game-type";
import { UpdateUserGameForm } from "@/components/update-user-game-form";
import { useGameStatisticStore } from "@/store/game-statistic-store";
import { useUserStore } from "@/store/user-store";

export const GameMainInfo = ({
  game,
  gameScores,
  listsData,
  userGamesData,
  statistic,
}: {
  game: Game | null;
  gameScores: GameScore[] | null;
  listsData: ListType[] | null;
  userGamesData: UserGame[] | null;
  statistic: GameStatistic[] | null;
}) => {
  const profile = useUserStore((state) => state.profile);
  const setGameScores = useGameStore((state) => state.setGameScores);
  const setUserGames = useUserGameStore((state) => state.setUserGames);
  const setLists = useUserGameStore((state) => state.setLists);
  const userGames = useUserGameStore((state) => state.userGames);
  const gameStatistic = useGameStatisticStore((state) => state.statistic);
  const setGameStatistic = useGameStatisticStore((state) => state.setStatistic);

  useEffect(() => {
    setGameScores(gameScores);
    setLists(listsData);
    setUserGames(userGamesData);
    if (statistic) setGameStatistic(statistic);
  }, [
    gameScores,
    listsData,
    setGameScores,
    setGameStatistic,
    setLists,
    setUserGames,
    statistic,
    userGamesData,
  ]);

  return (
    <div className="flex max-md:flex-col gap-10 lg:gap-32">
      <div className="flex justify-center items-center bg-black/10 min-h-full overflow-hidden">
        <Image
          src={`${BASE_URL}${
            game?.pictures.find((pic) => pic.cover)?.picture ||
            game?.pictures[0]?.picture ||
            "/media/placeholder/placeholder.png"
          }`}
          className="object-cover"
          width={420}
          height={495}
          alt={`${game?.name}` || "game"}
        />
      </div>
      <div className="flex flex-col gap-5 md:gap-5">
        <div className="flex flex-col gap-5">
          <div className="relative flex max-lg:flex-wrap items-center gap-x-10 gap-y-2">
            <h1 className="font-medium text-3xl lg:text-4xl">{game?.name}</h1>
            {game && <GameRating game={game} />}
            <div
              className={`bg-bg/90 px-1 border ${game?.status.play ? "border-green-500" : "border-amber-500"} text-xl`}
            >
              {game?.status.name}
            </div>
          </div>
          <div className="flex items-center gap-5">
            {game?.tags.map((tag) => (
              <div key={tag?.id} className="px-2 py-1 border border-blue">
                {tag?.name}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-1">
              <p className="font-medium text-white/60">
                Добавлена {dateFormatter(game?.date)}
              </p>
              <div className="flex items-center gap-3">
                <p className="font-medium">{game?.user.username}</p>
                {/*<Rating rating={game?.profile.rating} />*/}
              </div>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <a
                className="text-blue underline"
                href={game?.resource}
                target="_blank"
              >
                Официальный сайт
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-medium">
            <h5 className="text-lg">В списках</h5>
            <div>
              {listsData &&
                listsData.map((l) => (
                  <div
                    key={l.id}
                    className="gap-2 grid grid-cols-1 items-center md:grid-cols-2 py-2 md:py-1"
                  >
                    <p className="text-white/60">{l.name}:</p>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <p>
                        {gameStatistic.find((stat) => stat.list.id === l.id)
                          ?.users.length || 0}
                      </p>
                      <div className="flex items-center">
                        {gameStatistic &&
                          gameStatistic
                            .find((stat) => stat.list.id === l.id)
                            ?.users.filter((u) =>
                              profile?.favorites.find(
                                (fav) =>
                                  fav?.favorite_user_details.id === u.user.id,
                              ),
                            )
                            .slice(0, 5)
                            .map((prof) => (
                              <Link
                                href={`/user/${prof.id}`}
                                className="-ml-2 first:ml-0 hover:scale-125 transition-all duration-300"
                                key={prof.id}
                              >
                                <div className="flex flex-shrink-0 justify-center h-10 bg-slate-700 w-10 items-center rounded-full aspect-square overflow-hidden">
                                  <Image
                                    src={`${BASE_URL}${
                                      prof?.pictures[0]?.picture ||
                                      "/media/placeholder/avatar.jpg"
                                    }`}
                                    className="object-cover"
                                    width={40}
                                    height={40}
                                    alt="User"
                                  />
                                </div>
                              </Link>
                            ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {userGames &&
        userGames?.find((userGame) => userGame?.game.id === game?.id) ? (
          <UpdateUserGameForm
            userGame={userGames?.find(
              (userGame) => userGame?.game.id === game?.id,
            )}
          />
        ) : (
          game && <CreateUserGameForm game={game} />
        )}
        <div className="flex items-baseline gap-10 font-medium">
          <Link className="text-blue" href="#review">
            Обзор
          </Link>
          <Link className="text-blue" href="#comments">
            Обсуждение
          </Link>
        </div>
      </div>
    </div>
  );
};
