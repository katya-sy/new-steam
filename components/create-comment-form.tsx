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
import { createComment, replyComment } from "@/api/comment-api";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { useGameStore } from "@/store/game-store";
import { Dispatch, SetStateAction } from "react";
import { CommentType } from "@/types/comment-type";

const formSchema = z.object({
  text: z.string().min(1, "Обязательное поле"),
});

interface Props {
  gameId: number | undefined;
  repliedCommentId?: number;
  setComments: Dispatch<SetStateAction<CommentType[] | []>>;
  prevComments: CommentType[] | [];
}

export const CreateCommentForm = ({
  gameId,
  repliedCommentId,
  setComments,
  prevComments,
}: Props) => {
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
        if (repliedCommentId && data) {
          const replyRes = await replyComment({
            comment: data?.id,
            replied_comment: repliedCommentId,
          });

          if (replyRes.success) {
            setComments((prevComments) =>
              prevComments.map((comment) => {
                const updateCommentWithReplies = (
                  currentComment: CommentType
                ): CommentType => {
                  if (currentComment.id === repliedCommentId) {
                    return {
                      ...currentComment,
                      replies: [...currentComment.replies, data],
                    };
                  } else if (currentComment.replies.length > 0) {
                    return {
                      ...currentComment,
                      replies: currentComment.replies.map(
                        updateCommentWithReplies
                      ),
                    };
                  }
                  return currentComment;
                };

                return updateCommentWithReplies(comment);
              })
            );
            toast("Комментарий опубликован");
            return;
          } else {
            toast(<ErrorToast error={replyRes?.error} />);
          }
        }

        if (data) setComments([...prevComments, data]);
        toast("Комментарий опубликован");
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
