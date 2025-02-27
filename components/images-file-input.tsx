import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { X } from "lucide-react";

interface Props {
  pictures: File[] | null;
  setPictures: Dispatch<SetStateAction<File[] | null>>;
}

export const ImagesFileInput = ({ pictures, setPictures }: Props) => {
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newImages: string[] = [];

      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newImages.push(result);

          if (newImages.length === newFiles.length) {
            setBackgroundImages((prev) => [...prev, ...newImages]);
            setPictures((prev) => (prev ? [...prev, ...newFiles] : newFiles));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setBackgroundImages((prev) => prev.filter((_, i) => i !== index));
    setPictures((prev) => (prev ? prev.filter((_, i) => i !== index) : null));
  };

  return (
    <div className="flex flex-wrap gap-4">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className="relative aspect-square w-[50px] border border-blue border-dashed group"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <button
            type="button"
            onClick={() => handleRemoveImage(index)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex justify-center items-center bg-red-500 text-white rounded-full
              opacity-0 hover:opacity-100 transition-opacity"
          >
            <X />
          </button>
        </div>
      ))}

      <div className="flex justify-between items-center min-h-[100px] w-full py-2 px-5 border border-blue border-dashed">
        <input
          className="relative w-full before:absolute before:inset-0 before:flex before:justify-center
            before:items-center before:content-[attr(data-text)] before:bg-blue cursor-pointer
            font-medium text-bg text-sm"
          type="file"
          multiple
          onChange={handleFileChange}
          data-text={
            backgroundImages.length > 0
              ? "Добавить ещё"
              : "Загрузить изображения"
          }
        />
      </div>
    </div>
  );
};
