import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useTagStore } from "@/store/tag-store";

export const FilterSidebar = () => {
  const tags = useTagStore((state) => state.tags);

  return (
    <div className="flex flex-col gap-5 md:gap-10 py-5 md:py-12 pr-5">
      <div className="flex flex-col gap-2 md:gap-5">
        <h3 className="font-medium text-lg md:text-xl">Популярные теги</h3>
        <ToggleGroup.Root type="multiple" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <ToggleGroup.Item
              key={tag?.name}
              className="px-2 py-1 border border-blue toggle"
              value={tag?.name}
            >
              {tag?.name}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
    </div>
  );
};
