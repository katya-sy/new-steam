import * as ToggleGroup from "@radix-ui/react-toggle-group";

const tags = [
  { value: "fantasy", label: "Фэнтези" },
  { value: "horror", label: "Хоррор" },
  { value: "action", label: "Экшен" },
];

export const FilterSidebar = () => {
  return (
    <div className="flex flex-col gap-10 py-12 pr-5">
      <div className="flex flex-col gap-5">
        <h3 className="font-medium text-xl">Популярно</h3>
        <ToggleGroup.Root type="multiple" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <ToggleGroup.Item
              key={tag.value}
              className="px-2 py-1 border border-blue toggle"
              value={tag.value}
            >
              {tag.label}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
      <ToggleGroup.Root type="multiple" className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <ToggleGroup.Item
            key={tag.value}
            className="px-2 py-1 border border-blue toggle"
            value={tag.value}
          >
            {tag.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};
