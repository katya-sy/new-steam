import Image from "next/image";
import { Delete } from "./shared/delete";
import Link from "next/link";
import { Favorite } from "@/types/user-type";
import { BASE_URL } from "@/lib/consts";

interface Props {
  favorites: Favorite[] | [];
  title: string;
  favBy?: boolean;
}

export const FavoriteList = ({ favorites, title, favBy }: Props) => {
  return (
    <div className="flex flex-col gap-5 max-md:row-start-2">
      <h3 className="text-lg">{title}</h3>
      {favorites.length > 0 ? (
        favorites.map((fav) => (
          <div key={fav.id} className="flex justify-between items-center">
            <Link href="" className="flex items-center gap-3">
              <div className="flex justify-center items-center rounded-full aspect-square overflow-hidden">
                <Image
                  src={`${BASE_URL}${
                    favBy
                      ? fav?.user_pictures[0].picture ||
                        "/placeholder/placeholder.jpg"
                      : fav?.favorite_user_pictures[0].picture ||
                        "/placeholder/placeholder.jpg"
                  }`}
                  className="object-cover"
                  width={40}
                  height={40}
                  alt="User"
                />
              </div>
              <p className="font-medium text-blue">
                {favBy ? fav.user.username : fav.favorite_user_details.username}
              </p>
            </Link>
            {!favBy && (
              <button className="text-blue">
                <Delete />
              </button>
            )}
          </div>
        ))
      ) : (
        <p className="text-white/60 text-sm">
          {favBy ? "На Вас еще никто не подписался" : "У Вас еще нет подписок"}
        </p>
      )}
    </div>
  );
};
