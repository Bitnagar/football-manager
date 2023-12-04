import { PlayerStats } from "@/types/shared.types";

export default function PlayerDot({
  className,
  player,
  handlePlayerDotClick,
}: {
  className?: string;
  player: PlayerStats;
  handlePlayerDotClick: Function;
}) {
  return (
    <div
      className={
        className +
        " flex flex-col items-center justify-center gap-2 lg:text-xs xl:text-sm text-white font-bold text-center"
      }
    >
      <div
        onClick={() => {
          handlePlayerDotClick(player);
        }}
        className={`cursor-pointer lg:px-1 lg:py-1.5 lg:w-[28px] lg:h-[28px] xl:w-[32px] xl:h-[32px] rounded-full lg:ml-1 xl:ml-0 ${
          player["Position"] === "Goalkeeper"
            ? " bg-primary-orange"
            : " bg-black outline outline-2 outline-white xl:p-1.5"
        }`}
      >
        <h1>{player["Jersey Number"]}</h1>
      </div>
      <h1 className="font-normal">{player["Player Name"]}</h1>
    </div>
  );
}
