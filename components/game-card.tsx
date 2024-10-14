import Image from "next/image";
import { Arrow } from "./shared/arrow";
import * as Select from "@radix-ui/react-select";

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
          <div className="flex items-center gap-1 text-white/60">
            <span className="text-lg">230</span>
            <div className="flex flex-col">
              <button className="hover:text-blue rotate-180">
                <Arrow />
              </button>
              <button className="hover:text-blue">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="bg-blue px-5 py-2 w-full text-bg text-xl">
            Подробнее
          </button>
          <Select.Root>
            <Select.Trigger className="flex justify-between items-center px-5 py-2 border border-blue w-full text-xl">
              <Select.Value placeholder="В список" />
              <Select.Icon asChild className="pt-1">
                <Arrow />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="bg-white rounded-sm text-bg">
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Item
                    className="relative px-5 py-2 w-full cursor-pointer"
                    value="wish"
                  >
                    <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
                    <Select.ItemText>Хочу поиграть</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="relative px-5 py-2 w-full cursor-pointer"
                    value="play"
                  >
                    <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
                    <Select.ItemText>Играю</Select.ItemText>
                  </Select.Item>
                  <Select.Item
                    className="relative px-5 py-2 w-full cursor-pointer"
                    value="finish"
                  >
                    <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
                    <Select.ItemText>Поиграл</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
                <Select.ScrollDownButton />
                <Select.Arrow />
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
      <div className="top-2 right-2 absolute border-[#00FF00] bg-bg/90 px-1 border text-sm">
        Выходит
      </div>
    </div>
  );
};
