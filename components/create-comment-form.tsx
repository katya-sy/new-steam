"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/api/comment-api";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { useGameStore } from "@/store/game-store";

const formSchema = z.object({
  text: z.string().min(1, "Обязательное поле"),
});

export const CreateCommentForm = ({
  gameId,
}: {
  gameId: number | undefined;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const updateGame = useGameStore((state) => state.updateGame);
  const getGame = useGameStore((state) => state.getGameById);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (gameId) {
      const { success, data, error } = await createComment({
        game: gameId,
        text: values.text,
      });
      if (success) {
        form.reset();
        const currentGame = getGame(gameId);
        if (currentGame?.comments && data)
          updateGame(gameId, {
            ...currentGame,
            comments: [...currentGame?.comments, data],
          });
        toast(`Ваш комментарий будет опубликован в ближайшее время`);
      } else {
        toast(<ErrorToast error={error} />);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-3"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Textarea placeholder="Ваше мнение" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="max-w-[150px]" size="sm">
          Отправить
        </Button>
      </form>
    </Form>
  );
};
