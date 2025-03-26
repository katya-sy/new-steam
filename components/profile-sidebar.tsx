"use client";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import { Plus } from "./shared/plus";
import { FavoriteList } from "./favorite-list";
import * as Dialog from "@radix-ui/react-dialog";
import { AddGameForm } from "./add-game-form";
import { Profile } from "@/types/user-type";
import { BASE_URL } from "@/lib/consts";
import { dateFormatter } from "@/lib/date-formatter";
import { createVerificationRequest } from "@/api/verification-api";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import { ErrorToast } from "./error-toast";
import { setCookie, getCookie } from "@/lib/cookie";
import { Game, Status, Tag } from "@/types/game-type";
import { useStatusStore } from "@/store/status-store";
import { useTagStore } from "@/store/tag-store";
import { useGameStore } from "@/store/game-store";
import { Close } from "@/components/shared/close";
import { ListType, UserGame } from "@/types/user-game-type";
import { useUserGameStore } from "@/store/user-game-store";

interface Props {
  profile: Profile | null;
  statuses: Status[] | null;
  tags: Tag[] | null;
  gameData: Game[] | null;
  listsData: ListType[] | null;
  userGamesData: UserGame[] | null;
}

export const ProfileSidebar = ({
  profile,
  statuses,
  tags,
  gameData,
  listsData,
  userGamesData,
}: Props) => {
  const canVerify = async () => {
    const date = await getCookie("verification-date");
    if (date) {
      const verificationDate = new Date(date.value).getDate();
      const currentDate = new Date().getDate();
      const timeDifference = currentDate - verificationDate;
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      return daysDifference < 5;
    }
    return false;
  };
  const [disabledVerify, setDisabledVerify] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const games = useGameStore((state) => state.games);
  const setGames = useGameStore((state) => state.setGames);
  const setStatuses = useStatusStore((state) => state.setStatuses);
  const setTags = useTagStore((state) => state.setTags);
  const setUserGames = useUserGameStore((state) => state.setUserGames);
  const setLists = useUserGameStore((state) => state.setLists);
  const lists = useUserGameStore((state) => state.lists);
  const userGames = useUserGameStore((state) => state.userGames);

  useEffect(() => {
    canVerify().then((data) => setDisabledVerify(data));
  }, []);

  useEffect(() => {
    if (statuses) setStatuses(statuses);
    if (tags) setTags(tags);
    if (gameData) setGames(gameData);
    setLists(listsData);
    setUserGames(userGamesData);
  }, [
    gameData,
    listsData,
    setGames,
    setLists,
    setStatuses,
    setTags,
    setUserGames,
    statuses,
    tags,
    userGamesData,
  ]);

  const verificationHandler = async () => {
    const { success, data, error } = await createVerificationRequest();
    if (success) {
      toast("Заявка на верификацию отправлена");
      setDisabledVerify(true);
      if (data) {
        await setCookie("verification-date", data?.date);
      }
    }
    if (error) {
      toast(<ErrorToast error={error} />);
    }
  };

  return (
    <div className="flex flex-col gap-10 max-md:grid max-md:grid-rows-[auto,auto,auto] py-12 pr-5">
      <div className="md:flex md:flex-col gap-5 grid grid-cols-2 max-xs:grid-cols-1">
        <div className="flex justify-center items-center w-full aspect-square overflow-hidden">
          <Image
            src={`${BASE_URL}${
              profile?.pictures[0]?.picture || "/media/placeholder/avatar.jpg"
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
              ) : disabledVerify ? (
                <p className="text-white/60 text-xs text-left leading-[95%]">
                  Ожидание подтверждения...
                </p>
              ) : (
                <button
                  onClick={verificationHandler}
                  className="text-blue text-xs text-left leading-[95%]"
                >
                  Получить галочку
                </button>
              )}
            </div>
            <div className="flex flex-col gap-1 text-white/60 text-sm">
              <a
                href={`mailto:${profile?.user.email}`}
                className="overflow-hidden whitespace-nowrap overflow-ellipsis"
              >
                {profile?.user.email}
              </a>
              <p>{dateFormatter(profile?.birth_date)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-medium">Уровень</p>
            <span className="font-medium md:text-lg">{profile?.rating}</span>
          </div>
          {/*<button className="flex items-center gap-1 text-blue">*/}
          {/*  <Edit />*/}
          {/*  <span className="text-sm">Редактировать профиль</span>*/}
          {/*</button>*/}
        </div>
      </div>
      <Tabs.List className="flex md:flex-col max-md:flex-wrap gap-3 max-md:row-start-3">
        {lists &&
          lists.map((l) => (
            <Tabs.Trigger
              key={l.id}
              className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
              value={l.name}
            >
              {l.name}{" "}
              <span className="text-sm">
                {userGames?.filter((ug) => ug?.list.id === l.id).length || 0}
              </span>
            </Tabs.Trigger>
          ))}
        <div className="flex items-center gap-3 md:gap-5 md:mt-7">
          <Tabs.Trigger
            className="flex justify-center items-center gap-3 p-2 border border-blue md:w-full font-medium tabs-trigger"
            value="add"
          >
            Добавил{" "}
            <span className="text-sm">
              {games &&
                games.filter((games) => games?.user.id === profile?.user.id)
                  .length}
            </span>
          </Tabs.Trigger>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="font-medium text-blue">
              <Plus />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="absolute inset-0 bg-black/70 w-screen" />
              <Dialog.Content className="top-1/2 left-1/2 fixed bg-bg p-5 overflow-y-auto rounded-lg max-[700px]:h-dvh max-[700px]:w-full w-[700px] -translate-x-1/2 -translate-y-1/2">
                <Dialog.Description />
                <div className="flex flex-col gap-12">
                  <Dialog.Title className="font-medium text-white text-2xl">
                    Добавление игры
                  </Dialog.Title>
                  <AddGameForm setOpen={setOpen} />
                </div>
                <Dialog.Close className="top-2 right-2 absolute">
                  <Close />
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </Tabs.List>
      <FavoriteList title="Мои подписки" favorites={profile?.favorites || []} />
      <FavoriteList
        title="Мои подписчики"
        favorites={profile?.favorited_by || []}
        favBy
      />
    </div>
  );
};
