import Image from "next/image";
import { Rating } from "./rating";

export const Comment = () => {
  return (
    <div className="flex flex-col gap-5 py-2 pl-5">
      <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-3">
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          <div className="flex items-center gap-3">
            <div className="flex flex-shrink-0 justify-center items-center rounded-full overflow-hidden aspect-square">
              <Image
                src="/avatar.png"
                className="object-cover"
                width={40}
                height={40}
                alt="User"
              />
            </div>
            <p className="font-medium text-blue">Username</p>
            <Rating />
          </div>
          <button className="ml-auto text-white/60">Ответить</button>
        </div>
        <div className="flex items-center gap-5 ml-auto">
          <p className="text-white/60 text-xs">1 ноября 2024 04:25</p>
          <Rating />
        </div>
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
        auctor. In varius sapien in vestibulum mollis. Nam eu finibus ante. Nam
        ut odio venenatis, aliquam mauris nec, iaculis tortor. Donec rutrum
        feugiat neque vel congue.
      </p>
    </div>
  );
};
