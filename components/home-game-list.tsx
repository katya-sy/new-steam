import Image from "next/image";
import Link from "next/link";
import { GameCard } from "./game-card";

export const HomeGameList = () => {
  return (
    <div className="flex flex-col gap-10">
      <Link
        href=""
        className="relative flex w-full max-h-[500px] overflow-hidden"
      >
        <Image
          src="/game-img.jpeg"
          className="object-cover"
          width={1080}
          height={360}
          alt="Game"
        />
        <div className="top-5 right-5 absolute border-[#00FF00] bg-bg/90 px-1 border text-xl">
          Вышла
        </div>
      </Link>
      <div className="gap-5 grid grid-cols-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <GameCard key={item} />
        ))}
      </div>
    </div>
  );
};
