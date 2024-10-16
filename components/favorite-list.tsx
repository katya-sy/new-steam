import Image from "next/image";
import { Delete } from "./shared/delete";
import Link from "next/link";

export const FavoriteList = () => {
  return (
    <div className="flex flex-col gap-5 max-md:row-start-2">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="flex justify-between items-center">
          <Link href="" className="flex items-center gap-3">
            <div className="flex justify-center items-center rounded-full overflow-hidden aspect-square">
              <Image
                src="/avatar.png"
                className="object-cover"
                width={40}
                height={40}
                alt="User"
              />
            </div>
            <p className="font-medium text-blue">Fav Username</p>
          </Link>
          <button className="text-blue">
            <Delete />
          </button>
        </div>
      ))}
    </div>
  );
};
