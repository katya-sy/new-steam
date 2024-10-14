import Image from "next/image";
import { Rating } from "./rating";
import { GameListSelect } from "./game-list-select";
import Link from "next/link";

export const GameCard = () => {
  return (
    <div className="relative flex flex-col gap-5">
      <div className="flex justify-center items-center bg-black/10 w-full overflow-hidden aspect-square">
        <Image
          src="/game-img.jpeg"
          className="object-cover"
          width={200}
          height={200}
          alt="Game"
        />
      </div>
      <div className="flex flex-col justify-between gap-5 font-medium">
        <div className="flex items-center gap-3">
          <h3 className="text-2xl">Дота 100</h3>
          <Rating />
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/game/1"
            className="bg-blue px-5 py-2 w-full text-bg text-center text-xl"
          >
            Подробнее
          </Link>
          <GameListSelect />
        </div>
      </div>
      <div className="top-2 right-2 absolute border-[#00FF00] bg-bg/90 px-1 border text-sm">
        Выходит
      </div>
    </div>
  );
};
