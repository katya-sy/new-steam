"use client";
import { useState, useEffect } from "react";
import { Comment } from "./comment";
import { CreateCommentForm } from "./create-comment-form";
import { CommentType } from "@/types/comment-type";

interface Props {
  comments: CommentType[] | undefined;
  gameId: number | undefined;
}

export const CommentList = ({ comments, gameId }: Props) => {
  const [comms, setComms] = useState<CommentType[] | []>([]);

  useEffect(() => {
    if (comments) setComms(comments);
  }, [comments]);

  return (
    <div id="comments" className="flex flex-col gap-5">
      <h4 className="font-medium text-2xl">Обсуждение</h4>
      <CreateCommentForm
        setComments={setComms}
        prevComments={comms}
        gameId={gameId}
      />
      <div className="flex flex-col gap-3 -ml-5">
        {comms &&
          comms.map((comment) => (
            <Comment
              setComments={setComms}
              prevComments={comms}
              comment={comment}
              key={comment.id}
            />
          ))}
      </div>
    </div>
  );
};
