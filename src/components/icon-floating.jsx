import { cn } from "@/lib/utils";
import { useRef } from "react";
import { IoMdRose } from "react-icons/io";

export function IconFloating({ handleAddRose }) {
  const heartRef = useRef(null);

  const onHeartClick = () => {
    handleAddRose();
    if (heartRef.current) {
      heartRef.current.classList.remove("hidden");
      heartRef.current.classList.add("animate-hearTranslateUp", "inline-block");
    }

    setTimeout(() => {
      if (heartRef.current) {
        heartRef.current.classList.remove("animate-hearTranslateUp");
        heartRef.current.classList.add("hidden");
      }
    }, 1000);
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center bg-zinc-900/60 w-8 h-8 p-1 rounded-full",
        "group relative shrink-0 p-1 text-xl",
        "before:absolute before:left-1/2 before:top-1/2 before:-z-10 before:h-[140%] before:w-[140%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-colors",
        "after:absolute after:left-1/2 after:top-1/2 after:-z-10 after:h-[110%] after:w-[110%] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:transition-colors"
      )}
      onClick={onHeartClick}
    >
      <span
        ref={heartRef}
        className="absolute left-1/2 hidden -translate-x-1/2"
      >
        <IoMdRose size={32} className="fill-red-600/80 stroke-red-600" />
      </span>

      {/* animate-heartbeat is custom animation */}
      <IoMdRose
        className={cn(
          "transition-colors group-hover:fill-red-600 group-hover:animate-heartbeat z-10 group-hover:stroke-red-600 delay-0",
          {
            "fill-red-600 stroke-red-600": true,
            "stroke-neutral-700 fill-neutral-700": !true,
          }
        )}
      />
    </button>
  );
}
