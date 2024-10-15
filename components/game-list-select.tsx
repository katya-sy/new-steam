import { Arrow } from "./shared/arrow";
import * as Select from "@radix-ui/react-select";

export const GameListSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger className="flex justify-between items-center px-5 py-2 border border-blue w-full font-medium text-base md:text-xl">
        <Select.Value placeholder="В список" />
        <Select.Icon asChild className="pt-1">
          <Arrow />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-bg border border-blue rounded-sm text-white">
          <Select.ScrollUpButton />
          <Select.Viewport>
            <Select.Item
              className="relative px-5 py-2 w-full cursor-pointer"
              value="wish"
            >
              <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
              <Select.ItemText>Хочу поиграть</Select.ItemText>
            </Select.Item>
            <Select.Item
              className="relative px-5 py-2 w-full cursor-pointer"
              value="play"
            >
              <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
              <Select.ItemText>Играю</Select.ItemText>
            </Select.Item>
            <Select.Item
              className="relative px-5 py-2 w-full cursor-pointer"
              value="finish"
            >
              <Select.ItemIndicator className="absolute inset-0 bg-blue/20" />
              <Select.ItemText>Поиграл</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
          <Select.ScrollDownButton />
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
