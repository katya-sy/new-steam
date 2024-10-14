import Image from "next/image";
import { Rating } from "./rating";
import { Edit } from "./shared/edit";
import * as Tabs from "@radix-ui/react-tabs";
import { Plus } from "./shared/plus";
import { FavoriteList } from "./favorite-list";

export const ProfileSidebar = () => {
  const isCurrentUser = true;

  return (
    <div className="flex flex-col gap-10 py-12 pr-5">
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center w-full overflow-hidden aspect-square">
          <Image
            src="/avatar.png"
            className="object-cover"
            width={180}
            height={180}
            alt="User"
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h4 className="font-medium text-lg">Username</h4>
            {isCurrentUser && (
              <button className="text-blue text-left text-xs leading-[95%]">
                Получить галочку
              </button>
            )}
          </div>
          <div className="flex flex-col gap-1 text-sm text-white/60">
            {isCurrentUser && (
              <a href="mailto:username@gmail.com">username@gmail.com</a>
            )}
            <p>1 января 2000</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p className="font-medium">Уровень</p>
          <Rating />
        </div>
        {isCurrentUser && (
          <button className="flex items-center gap-1 text-blue">
            <Edit />
            <span className="text-sm">Редактировать профиль</span>
          </button>
        )}
      </div>
      <Tabs.List className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue w-full font-medium tabs-trigger"
            value="wish"
          >
            Хочу поиграть <span className="text-sm">28</span>
          </Tabs.Trigger>
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue w-full font-medium tabs-trigger"
            value="play"
          >
            Играю <span className="text-sm">45</span>
          </Tabs.Trigger>
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue w-full font-medium tabs-trigger"
            value="finish"
          >
            Поиграл <span className="text-sm">23</span>
          </Tabs.Trigger>
        </div>
        <div className="flex items-center gap-5">
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue w-full font-medium tabs-trigger"
            value="add"
          >
            Добавил <span className="text-sm">3</span>
          </Tabs.Trigger>
          <button className="text-blue">
            <Plus />
          </button>
        </div>
      </Tabs.List>
      <FavoriteList />
    </div>
  );
};
