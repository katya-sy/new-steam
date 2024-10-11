import Image from "next/image";

export const GameCard = () => {
  return (
    <div>
      <div className="flex overflow-hidden">
        <Image
          src="/game-img.jpeg"
          className="object-cover"
          width={200}
          height={200}
          alt="Game"
        />
      </div>
    </div>
  );
};
