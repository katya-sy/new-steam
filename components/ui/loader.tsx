import Image from "next/image";

export const Loader = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-bg z-10">
      <div className="flex flex-col items-center animate-ping">
        <Image src="/logo.svg" width={200} height={200} alt="Logo" />
        <h3 className="text-lg">Идет загрузка...</h3>
      </div>
    </div>
  );
};
