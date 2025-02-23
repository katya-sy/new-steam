import Image from "next/image";
import { Rating } from "./rating";
import { GameListSelect } from "./game-list-select";
import Link from "next/link";
import { Game } from "@/types/game-type";
import { BASE_URL } from "@/lib/consts";

export const GameCard = ({ game }: { game: Game }) => {
  return (
    <div className="relative flex flex-col gap-5 justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center bg-black/10 w-full overflow-hidden aspect-square">
          <Image
            src={`${BASE_URL}${
              game?.pictures.find((pic) => pic.cover)?.picture ||
              game?.pictures[0]?.picture ||
              "/placeholder/placeholder.jpg"
            }`}
            alt={game?.name}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
        <div className="flex items-start gap-3 max-w-full justify-between">
          <h3 className="text-xl md:text-2xl flex-shrink break-all">
            {game?.name}
          </h3>
          <Rating rating={game?.rating} />
        </div>
      </div>
      <div className="flex flex-col gap-5 font-medium">
        <div className="flex flex-col gap-3">
          <Link
            href={`/game/${game?.id}`}
            className="bg-blue px-5 py-2 w-full text-base text-bg text-center md:text-xl"
          >
            Подробнее
          </Link>
          <GameListSelect />
        </div>
      </div>
      <div
        className={`top-2 right-2 absolute ${game?.status.play ? "border-green-500" : "border-amber-500"} bg-bg/90 px-1 border text-sm`}
      >
        {game?.status.name}
      </div>
    </div>
  );
};
