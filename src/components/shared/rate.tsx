import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
}

export function Rate({ rating }: RatingStarsProps) {
  return (
    <div className="flex gap-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="relative size-5">
          <Star className="size-5 text-description fill-description" />

          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              width: `${Math.min(1, Math.max(0, rating - index)) * 100}%`,
            }}
          >
            <Star className="size-5 text-[#FFAD33] fill-[#FFAD33]" />
          </div>
        </div>
      ))}
    </div>
  );
}
