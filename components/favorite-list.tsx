import Image from "next/image";
import { Delete } from "./shared/delete";
import Link from "next/link";
import { Favorite, Profile } from "@/types/user-type";
import { BASE_URL } from "@/lib/consts";
import { deleteFavorite } from "@/api/favorite-api";
import { useUserStore } from "@/store/user-store";
import { toast } from "sonner";
import { ErrorToast } from "./error-toast";
import { useEffect, useState } from "react";

interface Props {
  favorites: Favorite[] | null;
  title: string;
  favBy?: boolean;
  user?: Profile;
}

export const FavoriteList = ({ favorites, title, favBy, user }: Props) => {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);
  const [favors, setFavors] = useState<Favorite[] | null>();

  useEffect(() => {
    setFavors(favorites);
  }, [favorites]);

  const unfollowHandler = async (fav: Favorite) => {
    if (fav?.id) {
      const { success, error } = await deleteFavorite(fav?.id);
      if (success && profile) {
        setProfile({
          ...profile,
          favorites: profile?.favorites.filter((f) => f?.id !== fav?.id),
        });
        if (favorites) {
          setFavors(profile?.favorites.filter((f) => f?.id !== fav?.id));
        }
        toast(`Вы отписались от ${fav?.favorite_user_details.username}`);
      }
      if (error) toast(<ErrorToast error={error} />);
    }
  };

  return (
    <div className="flex flex-col gap-5 max-md:row-start-2">
      <h3 className="text-lg">{title}</h3>
      {favors && favors?.length > 0 ? (
        favors.map((fav) => (
          <div key={fav.id} className="flex justify-between items-center">
            <Link
              href={`/user/${favBy ? fav.user.id : fav.favorite_user_details.id}`}
              className="flex items-center gap-3"
            >
              <div className="flex justify-center items-center rounded-full aspect-square overflow-hidden">
                <Image
                  src={`${BASE_URL}${
                    favBy
                      ? fav?.user_pictures[0]?.picture ||
                        "/media/placeholder/avatar.jpg"
                      : fav?.favorite_user_pictures[0]?.picture ||
                        "/media/placeholder/avatar.jpg"
                  }`}
                  className="object-cover"
                  width={40}
                  height={40}
                  alt={`${favBy ? fav.user.username : fav.favorite_user_details.username}`}
                />
              </div>
              <p className="font-medium text-blue">
                {favBy ? fav.user.username : fav.favorite_user_details.username}
              </p>
            </Link>
            {!favBy && !user && (
              <button
                onClick={() => unfollowHandler(fav)}
                className="text-blue"
              >
                <Delete />
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-white/60 text-sm">
          {favBy
            ? user
              ? `У ${user?.user.username} нет подписчиков`
              : "На Вас еще никто не подписался"
            : user
              ? `У ${user?.user.username} нет подписок`
              : "У Вас еще нет подписок"}
        </p>
      )}
    </div>
  );
};
