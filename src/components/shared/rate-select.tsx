"use client";
import { Star } from "lucide-react";
import { useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function RateSelect({ value = 0, onChange }: Props) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const displayRating = hoveredRating ?? value;

  return (
    <div className="flex gap-x-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starIndex = index + 1;
        const fillWidth = Math.min(1, Math.max(0, displayRating - index)) * 100;

        return (
          <div
            key={index}
            className="relative size-5 cursor-pointer"
            onMouseEnter={() => setHoveredRating(starIndex)}
            onMouseLeave={() => setHoveredRating(null)}
            onClick={() => onChange(starIndex)}
          >
            <Star className="size-5 text-description fill-description" />

            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillWidth}%` }}
            >
              <Star className="size-5 text-[#FFAD33] fill-[#FFAD33]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
