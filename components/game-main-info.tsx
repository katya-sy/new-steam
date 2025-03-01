"use client";
import { GameListSelect } from "@/components/game-list-select";
import { Game, GameScore } from "@/types/game-type";
import Image from "next/image";
import Link from "next/link";
import { dateFormatter } from "@/lib/date-formatter";
import { BASE_URL } from "@/lib/consts";
import { useGameStore } from "@/store/game-store";
import { useEffect } from "react";
import { GameRating } from "@/components/game-rating";

export const GameMainInfo = ({
  game,
  gameScores,
}: {
  game: Game | null;
  gameScores: GameScore[] | null;
}) => {
  const setGameScores = useGameStore((state) => state.setGameScores);

  useEffect(() => {
    setGameScores(gameScores);
  }, [gameScores, setGameScores]);

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
            <div className="flex items-center gap-1">
              <p className="text-white/60">Хочу поиграть:</p>
              <p className="text-white">2</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-white/60">Играю:</p>
              <p className="text-white">4</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-white/60">Поиграл:</p>
              <p className="text-white">3</p>
            </div>
          </div>
        </div>
        <GameListSelect />
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
