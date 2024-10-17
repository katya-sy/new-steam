import Image from "next/image";
import { Rating } from "./rating";
import { Edit } from "./shared/edit";
import * as Tabs from "@radix-ui/react-tabs";
import { Plus } from "./shared/plus";
import { FavoriteList } from "./favorite-list";
import { Close } from "./shared/close";
import * as Dialog from "@radix-ui/react-dialog";
import { AddGameForm } from "./add-game-form";

export const ProfileSidebar = () => {
  const isCurrentUser = true;

  return (
    <div className="flex flex-col gap-10 max-md:grid max-md:grid-rows-[auto,auto,auto] py-12 pr-5">
      <div className="md:flex md:flex-col gap-5 grid grid-cols-2 max-xs:grid-cols-1">
        <div className="flex justify-center items-center w-full overflow-hidden aspect-square">
          <Image
            src="/avatar.png"
            className="object-cover"
            width={400}
            height={400}
            alt="User"
          />
        </div>
        <div className="flex flex-col gap-5">
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
          className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
          value="finish"
        >
          Поиграл <span className="text-sm">23</span>
        </Tabs.Trigger>
        <div className="flex items-center gap-3 md:gap-5 md:mt-7 max-md:ml-3">
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
            value="add"
          >
            Добавил <span className="text-sm">3</span>
          </Tabs.Trigger>
          {isCurrentUser && (
            <Dialog.Root>
              <Dialog.Trigger className="font-medium text-blue">
                <Plus />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="absolute inset-0 bg-black/70" />
                <Dialog.Content className="top-1/2 left-1/2 fixed flex flex-col gap-12 bg-bg p-5 rounded-lg w-[calc(100%-32px)] sm:w-[500px] -translate-x-1/2 -translate-y-1/2">
                  <Dialog.Title className="font-medium text-2xl text-white">
                    Добавление игры
                  </Dialog.Title>
                  <Dialog.Description />
                  <AddGameForm />
                  <Dialog.Close className="top-2 right-2 absolute">
                    <Close />
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </div>
      </Tabs.List>
      <FavoriteList />
    </div>
  );
};
