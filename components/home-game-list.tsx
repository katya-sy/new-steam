"use client";
import Image from "next/image";
import Link from "next/link";
import { GameCard } from "./game-card";
import { Game } from "@/types/game-type";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/consts";
import { useGameStore } from "@/store/game-store";

const getNew = (a: Game, b: Game) => (a["date"] < b["date"] ? 1 : -1);

const getRecommend = (a: Game, b: Game) => {
  const today = new Date().toISOString().slice(5, 10);
  const isABirthday = a.profile.birth_date?.slice(5, 10) === today;
  const isBBirthday = b.profile.birth_date?.slice(5, 10) === today;
  if (isABirthday && !isBBirthday) {
    return -1;
  }
  if (!isABirthday && isBBirthday) {
    return 1;
  }
  if (a.profile.favorited_by.length !== b.profile.favorited_by.length) {
    return b.profile.favorited_by.length - a.profile.favorited_by.length;
  }
  if (a.rating !== b.rating) {
    return b.rating - a.rating;
  }
  return b.comments.length - a.comments.length;
};

export const HomeGameList = ({ data }: { data: Game[] }) => {
  const setGames = useGameStore((state) => state.setGames);
  const [recGames, setRecGames] = useState<Game[]>([]);
  const [newGames, setNewGames] = useState<Game[]>([]);

  useEffect(() => {
    setGames(data);
    setRecGames(
      [...data]
        .filter((g) => g.profile.is_verify)
        .sort(getRecommend)
        .slice(0, 6),
    );
    setNewGames([...data].sort(getNew).slice(0, 5));
  }, [data]);

  return (
    <div className="flex flex-col gap-10">
      {recGames && (
        <Link
          href={`/game/${recGames[0]?.id}`}
          className="relative flex w-full max-h-[500px] overflow-hidden"
        >
          <Image
            src={`${BASE_URL}${
              recGames[0]?.pictures.find((pic) => pic.cover)?.picture ||
              recGames[0]?.pictures[0]?.picture ||
              "/placeholder/placeholder.jpg"
            }`}
            className="object-cover"
            width={1080}
            height={360}
            alt="Game"
            priority
          />
          <div
            className={`top-2 md:top-5 right-2 md:right-5 absolute ${recGames[0]?.status.play ? "border-green-500" : "border-amber-500"} bg-bg/90 px-1 border md:text-xl`}
          >
            {recGames[0]?.status.name}
          </div>
        </Link>
      )}
      <div className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3">
        {recGames &&
          recGames
            .slice(1)
            .map((game) => <GameCard game={game} key={game.id} />)}
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="font-medium text-3xl">Новинки</h2>
        <div className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3">
          {newGames &&
            newGames.map((game) => <GameCard game={game} key={game.id} />)}
        </div>
      </div>
    </div>
  );
};
