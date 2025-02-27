"use client";
import { Arrow } from "./shared/arrow";

interface Props {
  rating: number;
  updateRating: (score: number) => void;
}

export const Rating = ({ updateRating, rating = 0 }: Props) => {
  return (
    <div className="flex items-center gap-1 text-white/60">
      <span className="font-medium md:text-lg">{rating}</span>
      <div className="flex flex-col">
        <button
          onClick={() => updateRating(1)}
          className="hover:text-blue rotate-180"
        >
          <Arrow />
        </button>
        <button onClick={() => updateRating(-1)} className="hover:text-blue">
          <Arrow />
        </button>
      </div>
    </div>
  );
};
