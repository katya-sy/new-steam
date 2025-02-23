"use client";
import { useEffect, useState } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { Tag } from "@/types/game-type";
import { useTagStore } from "@/store/tag-store";

export const SidebarWrapper = ({ data }: { data: Tag[] | null }) => {
  const setTags = useTagStore((state) => state.setTags);
  const [open, setOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    setTags(data || []);
  }, [data]);

  return (
    <div>
      {window.innerWidth < 768 && (
        <button
          className="mt-5 font-medium text-blue"
          onClick={() => setOpen(!open)}
        >
          {open ? "Скрыть" : "Поиск по тегам"}
        </button>
      )}
      {open && <FilterSidebar />}
    </div>
  );
};
