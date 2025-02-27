import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface Props {
  pictures: File[] | null;
  setPictures: Dispatch<SetStateAction<File[] | null>>;
  game?: boolean;
}

export const AvatarFileInput = ({ pictures, setPictures, game }: Props) => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (pictures) setPictures([...pictures, file]);
        setBackgroundImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="flex justify-between items-center aspect-square w-[200px] py-2 px-5 border mx-auto border-blue border-dashed"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <input
        className="relative w-full before:absolute before:inset-0 before:flex before:justify-center before:items-center before:content-[attr(data-text)] before:bg-blue cursor-pointer font-medium text-bg text-sm"
        type="file"
        onChange={handleFileChange}
        data-text={
          backgroundImage
            ? "Изменить"
            : `Загрузить ${game ? "обложку" : "аватар"}`
        }
      />
    </div>
  );
};
