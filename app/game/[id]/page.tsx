import { Comment } from "@/components/comment";
import { GameMainInfo } from "@/components/game-main-info";
import { Header } from "@/components/header";
import Image from "next/image";

export default function Game() {
  return (
    <div>
      <Header />
      <div className="flex flex-col gap-10 my-12 container">
        <GameMainInfo />
        <div className="gap-5 grid grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="flex justify-center items-center bg-black/10 min-h-full overflow-hidden"
            >
              <Image
                src="/game-img.jpeg"
                className="object-cover"
                width={420}
                height={495}
                alt="Game"
              />
            </div>
          ))}
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in
          mauris pharetra nibh consectetur rhoncus. Mauris egestas lectus eu sem
          ullamcorper, ac tincidunt lorem placerat. Nam sed est non lacus
          convallis accumsan. Maecenas ac aliquam erat. Maecenas et varius odio.
          Duis sed vehicula ante. Proin vitae auctor ipsum. Quisque iaculis
          rhoncus libero a suscipit. Aenean lobortis, orci feugiat consequat
          congue, turpis felis placerat sem, ut gravida nulla arcu nec massa.
          Praesent mollis ac dolor sed dignissim. Nam a tortor tempor, sodales
          massa in, dapibus arcu. Phasellus ultrices nisi ut purus vulputate, eu
          malesuada erat mattis. Sed sit amet hendrerit velit, non rutrum sem.
          Donec blandit turpis et sem placerat efficitur. Cras tortor tortor,
          aliquet a vulputate vitae, molestie finibus arcu. Sed bibendum mauris
          elit, vitae suscipit velit cursus eu. Sed dignissim semper nunc nec
          auctor. In varius sapien in vestibulum mollis. Nam eu finibus ante.
          Nam ut odio venenatis, aliquam mauris nec, iaculis tortor. Donec
          rutrum feugiat neque vel congue.
        </p>
        <div className="flex flex-col gap-5">
          <h4 className="font-medium text-2xl">Обзор</h4>
          <iframe
            className="min-h-[500px]"
            src="https://www.youtube.com/watch?v=jfKfPfyJRdk"
          />
        </div>
        <div className="flex flex-col gap-5">
          <h4 className="font-medium text-2xl">Обсуждение</h4>
          <div className="flex flex-col gap-3">
            <Comment />
            <div className="flex flex-col gap-3 ml-12 border-l-2 border-l-blue">
              <Comment />
              <Comment />
              <div className="flex flex-col gap-3 ml-12 border-l-2 border-l-blue">
                <Comment />
                <div className="flex flex-col gap-3 ml-12 border-l-2 border-l-blue">
                  <Comment />
                  <Comment />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 ml-12 border-l-2 border-l-blue">
              <Comment />
              <div className="flex flex-col gap-3 ml-12 border-l-2 border-l-blue">
                <Comment />
                <div className="flex flex-col gap-3 ml-12 border-l-2 border-l-blue">
                  <Comment />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
