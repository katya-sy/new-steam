import { Arrow } from "./shared/arrow";

export const Rating = ({ rating = 0 }) => {
  return (
    <div className="flex items-center gap-1 text-white/60">
      <span className="font-medium md:text-lg">{rating}</span>
      <div className="flex flex-col">
        <button className="hover:text-blue rotate-180">
          <Arrow />
        </button>
        <button className="hover:text-blue">
          <Arrow />
        </button>
      </div>
    </div>
  );
};
