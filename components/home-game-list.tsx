import Image from "next/image";
import { GameList } from "./game-list";
import Link from "next/link";

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
      <GameList />
    </div>
  );
};
