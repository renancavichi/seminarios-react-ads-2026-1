import { cn } from "@/lib/utils";

function FlipCard({ back, className, flipped = false, front, innerClassName }) {
  return (
    <div className={cn("[perspective:1400px]", className)}>
      <div
        className={cn(
          "relative h-full transition-transform duration-700 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]",
          innerClassName,
        )}
      >
        <div aria-hidden={flipped} className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>

        <div aria-hidden={!flipped} className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}

export { FlipCard };
