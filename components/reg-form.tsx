"use client";
import { Input } from "./ui/input";

export const RegForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-5 py-2 border border-blue border-dashed w-full">
        <span className="text-white/60">Аватар</span>
        <input
          className="relative before:absolute before:inset-0 before:flex before:justify-center before:items-center before:content-['Загрузить_изображение'] before:bg-blue w-[174px] font-medium text-bg text-sm"
          type="file"
          name=""
          id=""
        />
      </div>
      <Input placeholder="Никнейм" />
      <Input placeholder="Дата рождения" />
      <Input placeholder="E-mail" />
      <Input placeholder="Пароль" />
      <button className="bg-blue px-5 py-2 w-full font-medium text-bg text-center">
        Зарегистрироваться
      </button>
    </form>
  );
};
