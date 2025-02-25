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
import { createFavorite, deleteFavorite } from "@/api/favorite-api";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { useEffect, useState } from "react";

export const UserProfileSidebar = ({
  profile,
}: {
  profile: Profile | null;
}) => {
  const authProfile = useUserStore((state) => state.profile);
  const router = useRouter();
  const [currentProfile, setCurrentProfile] = useState<Profile | null>();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setCurrentProfile(profile);
    if (
      authProfile?.favorites.find(
        (fav) => fav.favorite_user_details.id === profile?.user.id,
      )
    )
      setIsFav(true);
  }, [profile, authProfile]);

  if (profile?.id === authProfile?.id) router.push("/profile");

  const followHandler = async () => {
    if (currentProfile) {
      const { success, data, error } = await createFavorite({
        favorite_user: currentProfile?.id,
      });
      if (success && currentProfile && data) {
        setCurrentProfile({
          ...currentProfile,
          favorited_by: [...currentProfile?.favorited_by, data],
        });
        setIsFav(true);
        toast(`Вы подписались на ${currentProfile?.user.username}`);
      }
      if (error) toast(<ErrorToast error={error} />);
    }
  };

  const unfollowHandler = async () => {
    const favoriteId = currentProfile?.favorited_by.find(
      (fav) => fav?.user.id === authProfile?.id,
    )?.id;
    if (favoriteId) {
      const { success, error } = await deleteFavorite(favoriteId);
      if (success && currentProfile) {
        setCurrentProfile({
          ...currentProfile,
          favorited_by: currentProfile?.favorited_by.filter(
            (fav) => fav?.id !== favoriteId,
          ),
        });
        setIsFav(false);
        toast(`Вы отписались от ${currentProfile?.user.username}`);
      }
      if (error) toast(<ErrorToast error={error} />);
    }
  };

  return (
    <div className="flex flex-col gap-10 max-md:grid max-md:grid-rows-[auto,auto,auto] py-12 pr-5">
      <div className="md:flex md:flex-col gap-5 grid grid-cols-2 max-xs:grid-cols-1">
        <div className="flex justify-center items-center w-full aspect-square overflow-hidden">
          <Image
            src={`${BASE_URL}${
              currentProfile?.pictures && currentProfile?.pictures?.length > 0
                ? currentProfile?.pictures[0]?.picture
                : "/media/placeholder/avatar.jpg"
            }`}
            className="object-cover"
            width={400}
            height={400}
            alt={`${currentProfile?.user.username}`}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h4 className="font-medium text-lg">
                {currentProfile?.user.username}
              </h4>
              {currentProfile?.is_verify && (
                <p className="text-blue text-lg text-left leading-[95%]">✓</p>
              )}
            </div>
            <div className="flex flex-col gap-1 text-white/60 text-sm">
              <p>{dateFormatter(currentProfile?.birth_date)}</p>
            </div>
          </div>
          {isFav ? (
            <Button onClick={unfollowHandler} variant="outline">
              Отписаться
            </Button>
          ) : (
            <Button onClick={followHandler}>Подписаться</Button>
          )}
          <div className="flex items-center gap-5">
            <p className="font-medium">Уровень</p>
            <Rating rating={currentProfile?.rating} />
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
      {currentProfile && (
        <>
          <FavoriteList
            title="Подписки"
            user={currentProfile}
            favorites={currentProfile?.favorites || []}
          />
          <FavoriteList
            title="Подписчики"
            user={currentProfile}
            favorites={currentProfile?.favorited_by || []}
            favBy
          />
        </>
      )}
    </div>
  );
};
