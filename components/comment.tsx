"use client";
import Image from "next/image";
import { Rating } from "./rating";
import { CommentType } from "@/types/comment-type";
import { BASE_URL } from "@/lib/consts";
import { datetimeFormatter } from "@/lib/date-formatter";
import Link from "next/link";
import { CreateCommentForm } from "./create-comment-form";
import { useState } from "react";

export const Comment = ({ comment }: { comment: CommentType }) => {
  const [answer, setAnswer] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 py-2 pl-5">
        <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-3">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
            <div className="flex items-center gap-3">
              <div className="flex flex-shrink-0 justify-center items-center rounded-full aspect-square overflow-hidden">
                <Image
                  src={`${BASE_URL}${
                    comment.profile?.pictures[0]?.picture ||
                    "/media/placeholder/avatar.jpg"
                  }`}
                  className="object-cover"
                  width={40}
                  height={40}
                  alt="User"
                />
              </div>
              <Link
                href={`/user/${comment?.user.id}`}
                className="font-medium text-blue"
              >
                {comment?.user.username}
              </Link>
              <Rating />
            </div>
            <button
              onClick={() => setAnswer(!answer)}
              className="ml-auto text-white/60"
            >
              {answer ? "Отмена" : "Ответить"}
            </button>
          </div>
          <div className="flex items-center gap-5 ml-auto">
            <p className="text-white/60 text-xs">
              {datetimeFormatter(comment?.date)}
            </p>
            <Rating rating={comment?.rating} />
          </div>
        </div>
        <p>{comment?.text}</p>
      </div>
      {answer && (
        <div className="ml-5">
          <CreateCommentForm
            repliedCommentId={comment?.id}
            gameId={comment?.game}
          />
        </div>
      )}
      {comment?.replies.length > 0 && (
        <div className="flex flex-col gap-3 ml-5 md:ml-12 border-l border-l-blue md:border-l-2">
          {comment?.replies.map((comm) => (
            <Comment comment={comm} key={comm.id} />
          ))}
        </div>
      )}
    </>
  );
};
