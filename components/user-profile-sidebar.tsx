"use client";
import Image from "next/image";
import { Rating } from "./rating";
import * as Tabs from "@radix-ui/react-tabs";
import { FavoriteList } from "./favorite-list";
import { Profile } from "@/types/user-type";
import { BASE_URL } from "@/lib/consts";
import { dateFormatter } from "@/lib/date-formatter";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "next/navigation";

export const UserProfileSidebar = ({
  profile,
}: {
  profile: Profile | null;
}) => {
  const authProfile = useUserStore((state) => state.profile);
  const router = useRouter();

  if (profile?.id === authProfile?.id) router.push("/profile");

  return (
    <div className="flex flex-col gap-10 max-md:grid max-md:grid-rows-[auto,auto,auto] py-12 pr-5">
      <div className="md:flex md:flex-col gap-5 grid grid-cols-2 max-xs:grid-cols-1">
        <div className="flex justify-center items-center w-full aspect-square overflow-hidden">
          <Image
            src={`${BASE_URL}${
              profile?.pictures && profile?.pictures?.length > 0
                ? profile?.pictures[0]?.picture
                : "/media/placeholder/avatar.jpg"
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
              {profile?.is_verify && (
                <p className="text-blue text-lg text-left leading-[95%]">✓</p>
              )}
            </div>
            <div className="flex flex-col gap-1 text-white/60 text-sm">
              <p>{dateFormatter(profile?.birth_date)}</p>
            </div>
          </div>
          {authProfile?.favorites.find(
            (fav) => fav.favorite_user_details.id === profile?.user.id
          ) ? (
            <Button variant="outline">Отписаться</Button>
          ) : (
            <Button>Подписаться</Button>
          )}
          <div className="flex items-center gap-5">
            <p className="font-medium">Уровень</p>
            <Rating rating={profile?.rating} />
          </div>
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
        </div>
      </Tabs.List>
      <FavoriteList title="Подписки" favorites={profile?.favorites || []} />
      <FavoriteList
        title="Подписчики"
        favorites={profile?.favorited_by || []}
        favBy
      />
    </div>
  );
};
