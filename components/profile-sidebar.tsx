import Image from "next/image";
import { Edit } from "./shared/edit";
import * as Tabs from "@radix-ui/react-tabs";
import { Plus } from "./shared/plus";
import { FavoriteList } from "./favorite-list";
import * as Dialog from "@radix-ui/react-dialog";
import { AddGameForm } from "./add-game-form";
import { DialogPortal } from "./ui/dialog-portal";
import { Profile } from "@/types/user-type";
import { BASE_URL } from "@/lib/consts";
import { dateFormatter } from "./../lib/date-formatter";

export const ProfileSidebar = ({ profile }: { profile: Profile | null }) => {
  return (
    <div className="flex flex-col gap-10 max-md:grid max-md:grid-rows-[auto,auto,auto] py-12 pr-5">
      <div className="md:flex md:flex-col gap-5 grid grid-cols-2 max-xs:grid-cols-1">
        <div className="flex justify-center items-center w-full aspect-square overflow-hidden">
          <Image
            src={`${BASE_URL}${
              profile?.pictures[0]?.picture || "/placeholder/placeholder.jpg"
            }`}
            className="object-cover"
            width={400}
            height={400}
            alt={`${profile?.user.username}`}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h4 className="font-medium text-lg">{profile?.user.username}</h4>
              {profile?.is_verify ? (
                <p className="text-blue text-lg text-left leading-[95%]">✓</p>
              ) : (
                <button className="text-blue text-xs text-left leading-[95%]">
                  Получить галочку
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1 text-white/60 text-sm">
              <a href="mailto:username@gmail.com">{profile?.user.email}</a>
              <p>{dateFormatter(profile?.birth_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-medium">Уровень</p>
            <span className="font-medium md:text-lg">{profile?.rating}</span>
          </div>
          <button className="flex items-center gap-1 text-blue">
            <Edit />
            <span className="text-sm">Редактировать профиль</span>
          </button>
        </div>
      </div>
      <Tabs.List className="flex md:flex-col max-md:flex-wrap gap-3 max-md:row-start-3">
        <Tabs.Trigger
          className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
          value="wish"
        >
          Хочу поиграть <span className="text-sm">28</span>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
          value="play"
        >
          Играю <span className="text-sm">45</span>
        </Tabs.Trigger>
        <Tabs.Trigger
          className="flex justify-center items-center gap-3 max-md:mr-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
          value="finish"
        >
          Поиграл <span className="text-sm">23</span>
        </Tabs.Trigger>
        <div className="flex items-center gap-3 md:gap-5 md:mt-7">
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
            value="add"
          >
            Добавил <span className="text-sm">3</span>
          </Tabs.Trigger>
          <Dialog.Root>
            <Dialog.Trigger className="font-medium text-blue">
              <Plus />
            </Dialog.Trigger>
            <DialogPortal>
              <div className="flex flex-col gap-12">
                <Dialog.Title className="font-medium text-white text-2xl">
                  Добавление игры
                </Dialog.Title>
                <AddGameForm />
              </div>
            </DialogPortal>
          </Dialog.Root>
        </div>
      </Tabs.List>
      <FavoriteList />
    </div>
  );
};
