"use client";
import { useTagStore } from "@/store/tag-store";
import { useGameStore } from "@/store/game-store";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

export const FilterSidebar = () => {
  const tags = useTagStore((state) => state.tags);
  const setSearchTags = useGameStore((state) => state.setSearchTags);
  const searchTags = useGameStore((state) => state.searchTags);
  const search = useGameStore((state) => state.search);
  const setShowAllGames = useGameStore((state) => state.setShowAllGames);
  const showAllGames = useGameStore((state) => state.showAllGames);

  const handleTagToggle = (selectedTags: string[]) => {
    setSearchTags(selectedTags);
  };

  return (
    <div className="flex flex-col gap-5 md:gap-10 py-5 md:py-12 pr-5">
      <div className="flex flex-col gap-2 md:gap-5">
        {!(searchTags.length !== 0 || search) && (
          <Button
            onClick={() => setShowAllGames(!showAllGames)}
            size="sm"
            className="mb-3"
          >
            {showAllGames ? "Лучшие игры" : "Все игры"}
          </Button>
        )}
        <h3 className="font-medium text-lg md:text-xl">Популярные теги</h3>
        <ToggleGroup
          type="multiple"
          value={searchTags}
          onValueChange={handleTagToggle}
          className="flex flex-wrap justify-start gap-2"
        >
          {tags?.map((tag) => (
            <ToggleGroupItem key={tag.id} variant="outline" value={tag.name}>
              {tag.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
};
