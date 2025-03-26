"use client";
import { useEffect, useState } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { Tag } from "@/types/game-type";
import { useTagStore } from "@/store/tag-store";
import { useGameStore } from "@/store/game-store";

export const SidebarWrapper = ({ data }: { data: Tag[] | null }) => {
  const setTags = useTagStore((state) => state.setTags);
  const search = useGameStore((state) => state.search);
  const setShowAllGames = useGameStore((state) => state.setShowAllGames);
  const showAllGames = useGameStore((state) => state.showAllGames);
  const searchTags = useGameStore((state) => state.searchTags);
  const [open, setOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    setTags(data || []);
  }, [data]);

  return (
    <div>
      {!(searchTags.length !== 0 || search) && (
        <div
          onClick={() => setShowAllGames(!showAllGames)}
          className="mb-3 mt-5 md:mt-12 md:-mb-3 font-medium text-blue cursor-pointer"
        >
          {showAllGames ? "Смотреть лучшие игры" : "Смотреть все игры"}
        </div>
      )}
      <button
        className={`${open ? "text-blue/70" : "text-blue"} font-medium md:hidden`}
        onClick={() => setOpen(!open)}
      >
        {open ? "Скрыть теги" : "Поиск по тегам"}
      </button>
      {open && <FilterSidebar />}
    </div>
  );
};
