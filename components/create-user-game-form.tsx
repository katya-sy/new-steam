"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUserGameStore } from "@/store/user-game-store";
import { createUserGame } from "@/api/user-game-api";
import { Game } from "@/types/game-type";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";

const formSchema = z.object({
  list: z.string(),
});

export const CreateUserGameForm = ({ game }: { game: Game }) => {
  const lists = useUserGameStore((state) => state.lists);
  const userGames = useUserGameStore((state) => state.userGames);
  const setUserGames = useUserGameStore((state) => state.setUserGames);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const list_id = lists?.find((list) => list?.name === values.list)?.id;
    if (list_id) {
      const { success, data, error } = await createUserGame({
        game_id: game?.id,
        list_id,
      });

      if (success && data) {
        form.reset();
        toast(`Игра ${game?.name} добавлена в список ${values.list}`);
        if (userGames) setUserGames([...userGames, data]);
        // if (statistic) {
        //   const targetList = statistic.find(
        //     (stat) => stat.list.id === data.list.id,
        //   );
        //
        //   if (targetList && profile) {
        //     setStatistic(
        //       statistic.map((stat) =>
        //         stat.list.id === data.list.id
        //           ? {
        //               ...stat,
        //               users: [...stat.users, profile],
        //             }
        //           : stat,
        //       ),
        //     );
        //   } else if (profile) {
        //     setStatistic([...statistic, { list: data.list, users: [profile] }]);
        //   }
        // }
      } else {
        form.reset();
        toast(<ErrorToast error={error} />);
      }
    }
  }

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="list"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.handleSubmit(onSubmit)();
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="В список" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-bg border border-blue rounded-sm text-white">
                  {lists &&
                    lists?.map((l) => (
                      <SelectItem
                        key={l.id}
                        className="relative px-5 py-2 w-full cursor-pointer"
                        value={l.name}
                      >
                        <div className="relative">
                          <span className="peer">{l.name}</span>
                          <div className="absolute inset-0 bg-blue/20 hidden peer-data-[state=checked]:block" />
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
