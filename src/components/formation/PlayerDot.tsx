import { PlayerStats } from "@/types/shared.types";
import { useEffect } from "react";

export default function PlayerDot({
  className,
  player,
  handlePlayerDotClick,
}: {
  className: string;
  player: PlayerStats;
  handlePlayerDotClick: Function;
}) {
  // useEffect(() => {
  //   console.log("playerDots  rendered");
  // }, []);
  return (
    <div
      onClick={() => {
        handlePlayerDotClick(player);
      }}
      className={
        className +
        `${
          player["Position"] === "Goalkeeper"
            ? " bg-yellow-500 py-1"
            : " bg-black outline outline-2 outline-white px-2 py-1"
        }`
      }
    >
      <h1 className="text-white font-bold text-center">
        {player["Jersey Number"]}
      </h1>
    </div>
  );
}
