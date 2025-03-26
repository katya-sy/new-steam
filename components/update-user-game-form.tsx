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
import { deleteUserGame, updateUserGame } from "@/api/user-game-api";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { UserGame } from "@/types/user-game-type";

const formSchema = z.object({
  list: z.string(),
});

export const UpdateUserGameForm = ({
  userGame,
}: {
  userGame: UserGame | undefined;
}) => {
  const lists = useUserGameStore((state) => state.lists);
  const userGames = useUserGameStore((state) => state.userGames);
  const setUserGames = useUserGameStore((state) => state.setUserGames);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      list: userGame?.list.name,
    },
  });

  const removeUserGame = async () => {
    if (userGame) {
      const { success, error } = await deleteUserGame(userGame?.id);

      if (success) {
        form.reset();
        toast(`Игра ${userGame?.game.name} удалена из списков`);
        if (userGames)
          setUserGames(userGames.filter((uGame) => uGame?.id !== userGame?.id));
        // setStatistic(
        //   statistic
        //     .map((listStat) => ({
        //       ...listStat,
        //       users: listStat.users.filter(
        //         (user) => user.user.id !== userGame?.user,
        //       ),
        //     }))
        //     .filter((listStat) => listStat.users.length),
        // );
      } else {
        toast(<ErrorToast error={error} />);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.list === "delete") return removeUserGame();
    const list_id = lists?.find((list) => list?.name === values.list)?.id;
    if (list_id && userGame) {
      const { success, data, error } = await updateUserGame(
        { list_id },
        userGame?.id,
      );

      if (success && data) {
        toast(`Игра ${userGame?.game.name} перенесена в список ${values.list}`);
        if (userGames)
          setUserGames(
            userGames.map((uGame) =>
              uGame?.id === userGame?.id
                ? { ...userGame, list: data?.list }
                : uGame,
            ),
          );
        // if (statistic) {
        //   const updatedStats = statistic
        //     .map((listStat) => ({
        //       ...listStat,
        //       users: listStat.users.filter(
        //         (user) => user.user.id !== userGame?.user,
        //       ),
        //     }))
        //     .filter((listStat) => listStat.users.length)
        //
        //   const targetList = updatedStats.find(
        //     (stat) => stat.list.id === data.list.id,
        //   )
        //
        //   if (targetList && profile) {
        //     setStatistic(
        //       updatedStats.map((stat) =>
        //         stat.list.id === data.list.id
        //           ? {
        //             ...stat,
        //             users: [...stat.users, profile],
        //           }
        //           : stat,
        //       ),
        //     )
        //   } else if (profile) {
        //     setStatistic([
        //       ...updatedStats,
        //       { list: data.list, users: [profile] },
        //     ])
        //   }
        // }
      } else {
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
                onValueChange={async (value) => {
                  field.onChange(value);
                  if (value === "delete") await removeUserGame();
                  else await form.handleSubmit(onSubmit)();
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
                  <SelectItem
                    className="relative px-5 py-2 w-full cursor-pointer"
                    value="delete"
                  >
                    <div className="relative">
                      <span className="peer text-red-500">Не смотрю</span>
                      <div className="absolute inset-0 bg-blue/20 hidden peer-data-[state=checked]:block" />
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
