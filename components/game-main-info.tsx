import { GameListSelect } from "@/components/game-list-select";
import { Rating } from "@/components/rating";
import Image from "next/image";
import Link from "next/link";

export const GameMainInfo = () => {
  return (
    <div className="flex gap-32">
      <div className="flex justify-center items-center bg-black/10 min-h-full overflow-hidden">
        <Image
          src="/game-img.jpeg"
          className="object-cover"
          width={420}
          height={495}
          alt="Game"
        />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-10">
            <h1 className="font-medium text-4xl">Дота 100</h1>
            <Rating />
            <div className="border-[#00FF00] bg-bg/90 px-1 border text-xl">
              Вышла
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="px-2 py-1 border border-blue">Фэнтези</div>
            <div className="px-2 py-1 border border-blue">Хоррор</div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-10">
              <p className="font-medium text-white/60">
                Добавлена 2 октября 2024
              </p>
              <div className="flex items-center gap-3">
                <p className="font-medium">AddUsername</p>
                <Rating />
              </div>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <p className="text-white/60">Официальный сайт:</p>
              <a className="text-blue" href="" target="_blank">
                http://site.com
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-medium">
            <h5 className="text-lg">В списках</h5>
            <div className="flex items-center gap-1">
              <p className="text-white/60">Хочу поиграть:</p>
              <p className="text-white">345</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-white/60">Играю:</p>
              <p className="text-white">13</p>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-white/60">Поиграл:</p>
              <p className="text-white">25</p>
            </div>
          </div>
        </div>
        <GameListSelect />
        <div className="flex items-baseline gap-10 font-medium">
          <Link className="text-blue" href="#">
            Обзор
          </Link>
          <Link className="text-blue" href="#">
            Обсуждение
          </Link>
        </div>
      </div>
    </div>
  );
};
