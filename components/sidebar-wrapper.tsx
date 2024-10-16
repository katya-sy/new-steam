"use client";
import { useState } from "react";
import { FilterSidebar } from "./filter-sidebar";

export const SidebarWrapper = () => {
  const [open, setOpen] = useState(window.innerWidth > 768);

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
