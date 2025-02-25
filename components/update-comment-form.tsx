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
import { updateComment } from "@/api/comment-api";
import { toast } from "sonner";
import { ErrorToast } from "@/components/error-toast";
import { Dispatch, SetStateAction } from "react";
import { CommentType } from "@/types/comment-type";

const formSchema = z.object({
  text: z.string().min(1, "Обязательное поле"),
});

interface Props {
  comment: CommentType;
  setComments: Dispatch<SetStateAction<CommentType[] | []>>;
  prevComments: CommentType[] | [];
}

export const UpdateCommentForm = ({
  comment,
  setComments,
  prevComments,
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: comment?.text,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (comment?.id) {
      const { success, data, error } = await updateComment(values, comment?.id);

      if (success) {
        form.reset();

        if (data) {
          setComments((prevComments) => {
            const updateCommentWithReplies = (
              currentComment: CommentType
            ): CommentType => {
              if (currentComment.id === comment.id) {
                return {
                  ...currentComment,
                  text: data.text,
                };
              }

              if (currentComment.replies.length > 0) {
                return {
                  ...currentComment,
                  replies: currentComment.replies.map(updateCommentWithReplies),
                };
              }
              return currentComment;
            };
            return prevComments.map(updateCommentWithReplies);
          });

          toast("Комментарий изменен");
        }
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
