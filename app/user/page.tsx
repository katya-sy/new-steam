import { GameCard } from "@/components/game-card";
import { Header } from "@/components/header";
import { ProfileSidebar } from "@/components/profile-sidebar";
import * as Tabs from "@radix-ui/react-tabs";
import * as Dialog from "@radix-ui/react-dialog";
import { AddGameForm } from "@/components/add-game-form";
import { DialogPortal } from "@/components/ui/dialog-portal";

export default function User() {
  return (
    <div>
      <Header />
      <Tabs.Root
        defaultValue="wish"
        className="gap-5 grid grid-cols-6 max-[1200px]:grid-cols-4 max-md:grid-cols-1 container"
      >
        <ProfileSidebar />
        <div className="col-span-5 max-[1200px]:col-span-3 max-md:col-span-1 md:my-12 mt-0 mb-12">
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
            value="wish"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
            value="play"
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
            value="finish"
          >
            {[1, 2].map((item) => (
              <GameCard key={item} />
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="gap-5 grid grid-cols-5 max-[1200px]:grid-cols-4 max-sm:grid-cols-2 max-lg:grid-cols-3"
            value="add"
          >
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <GameCard />
                <Dialog.Root>
                  <Dialog.Trigger className="bg-blue mt-3 px-5 py-2 w-full font-medium text-bg text-center md:text-xl">
                    Редактировать
                  </Dialog.Trigger>
                  <DialogPortal>
                    <div className="flex flex-col gap-12">
                      <Dialog.Title className="font-medium text-2xl text-white">
                        Редактирование игры
                      </Dialog.Title>
                      <AddGameForm />
                    </div>
                  </DialogPortal>
                </Dialog.Root>
              </div>
            ))}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
