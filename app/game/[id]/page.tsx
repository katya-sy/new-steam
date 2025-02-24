import { getGameById } from "@/api/game-api";
import { Comment } from "@/components/comment";
import { GameMainInfo } from "@/components/game-main-info";
import { Header } from "@/components/header";
import { BASE_URL } from "@/lib/consts";
import Image from "next/image";

export default async function Game({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data } = await getGameById(Number(id));

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-10 my-12 container">
        <GameMainInfo game={data} />
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data?.pictures &&
            data?.pictures.length > 0 &&
            data?.pictures
              .filter((pic) => !pic.cover)
              .map((pic) => (
                <div
                  key={pic.id}
                  className="flex justify-center items-center bg-black/10 min-h-full overflow-hidden"
                >
                  <Image
                    src={`${BASE_URL}${pic?.picture}`}
                    className="object-cover"
                    width={420}
                    height={495}
                    alt={`${data?.name}` || "game"}
                  />
                </div>
              ))}
        </div>
        <p>{data?.description}</p>
        <div id="review" className="flex flex-col gap-5">
          <h4 className="font-medium text-2xl">Обзор</h4>
          <iframe
            className="min-h-60 xs:min-h-80 md:min-h-[500px]"
            src={data?.video_source}
            allowFullScreen
          />
        </div>
        <div id="comments" className="flex flex-col gap-5">
          <h4 className="font-medium text-2xl">Обсуждение</h4>
          <div className="flex flex-col gap-3 -ml-5">
            {data?.comments.map((comment) => (
                <Comment comment={comment} key={comment.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
