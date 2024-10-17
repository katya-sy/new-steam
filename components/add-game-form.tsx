"use client";
import { Arrow } from "./shared/arrow";
import { Input } from "./ui/input";
import * as Select from "@radix-ui/react-select";

const statuses = [
  { value: "announcement", label: "Анонс" },
  { value: "ongoing", label: "Выходит" },
  { value: "released", label: "Вышла" },
];

const tags = [
  { value: "fantasy", label: "Фэнтези" },
  { value: "horror", label: "Хоррор" },
  { value: "action", label: "Экшен" },
];

export const AddGameForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
      <Input placeholder="Название" />
      <textarea
        className="bg-transparent px-5 py-2 border border-blue w-full h-20 text-white placeholder:text-white/60 resize-none"
        placeholder="Описание"
      />
      <div className="flex justify-between items-center px-5 py-2 border border-blue border-dashed w-full">
        <span className="text-white/60">Изображения</span>
        <input
          className="relative before:absolute before:inset-0 before:flex before:justify-center before:items-center before:content-['Загрузить_изображение'] before:bg-blue w-28 xs:w-[174px] font-medium text-bg text-sm before:text-center max-xs:text-wrap"
          type="file"
          name=""
          id=""
        />
      </div>
      <Select.Root>
        <Select.Trigger className="flex justify-between items-center px-5 py-2 border border-blue w-full font-medium text-base">
          <Select.Value placeholder="Статус выхода" />
          <Select.Icon asChild className="pt-1">
            <Arrow />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-bg border border-blue rounded-sm text-white">
            <Select.ScrollUpButton />
            <Select.Viewport>
              {statuses.map((status) => (
                <Select.Item
                  key={status.value}
                  className="relative px-5 py-2 w-full cursor-pointer"
                  value={status.value}
                >
                  <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
                  <Select.ItemText>{status.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <Select.Root>
        <Select.Trigger className="flex justify-between items-center px-5 py-2 border border-blue w-full font-medium text-base">
          <Select.Value placeholder="Теги" />
          <Select.Icon asChild className="pt-1">
            <Arrow />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-bg border border-blue rounded-sm text-white">
            <Select.ScrollUpButton />
            <Select.Viewport>
              {tags.map((tag) => (
                <Select.Item
                  key={tag.value}
                  className="relative px-5 py-2 w-full cursor-pointer"
                  value={tag.value}
                >
                  <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
                  <Select.ItemText>{tag.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
            <Select.Arrow />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <Input placeholder="Ссылка на официальный сайт" />
      <Input placeholder="Ссылка на видеообзор" />
      <button className="bg-blue px-5 py-2 w-full font-medium text-bg text-center">
        Опубликовать
      </button>
    </form>
  );
};
