import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deletePlayerData, editStarters } from "@/store/rosterSlice";
import { PlayerStats, Starters } from "@/types/shared.types";
import store, { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { editMetadata } from "@/store/metadataSlice";
import DeleteIcon from "../ui/DeleteIcon";
import toast from "react-hot-toast";

export default function DeletePlayerModal({
  currentPlayer,
}: {
  currentPlayer: PlayerStats;
}) {
  const dispatch = useDispatch();

  // unique key for editing and deleting the player
  const uniqueKey = currentPlayer["uniqueKey"];

  function select(state: RootState): PlayerStats[] {
    return state.rosterData.players;
  }

  function dispatchFileSummary(updatedPlayers: PlayerStats[]): void {
    let g = 0,
      d = 0,
      m = 0,
      f = 0,
      s = 0,
      total = updatedPlayers.length;
    updatedPlayers.forEach((Player: PlayerStats) => {
      if (Player["starter"] === "Yes") s++;
      if (Player["position"] === "Goalkeeper") g++;
      if (Player["position"] === "Defender") d++;
      if (Player["position"] === "Midfielder") m++;
      if (Player["position"] === "Forward") f++;
    });
    dispatch(
      editMetadata({
        data: {
          defenders: d,
          goalkeepers: g,
          midfielders: m,
          forwards: f,
          starters: s,
          total: total,
        },
      })
    );
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      deletePlayerData({
        uniqueKey: uniqueKey,
        currentPlayer: currentPlayer,
      })
    );
    let updatedPlayers = select(store.getState());
    dispatchFileSummary(updatedPlayers);
    let starters = {
      goalkeeper: [],
      defenders: [],
      midfielders: [],
      forwards: [],
    } as Starters;
    updatedPlayers.forEach((player: PlayerStats) => {
      if (player["starter"] === "Yes") {
        switch (player["position"]) {
          case "Goalkeeper":
            starters.goalkeeper.push(player);
            break;
          case "Defender":
            starters.defenders.push(player);
            break;
          case "Midfielder":
            starters.midfielders.push(player);
            break;
          case "Forward":
            starters.forwards.push(player);
            break;

          default:
            break;
        }
      }
    });
    dispatch(editStarters(starters));
    toast.success("Player deleted successfully.");
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex gap-2">
          <DeleteIcon />
          Delete Player
        </DialogTrigger>
        <DialogContent className="w-[379px] h-[186px] bg-neutral-light border-none shadow-custom rounded-md">
          <DialogHeader className=" items-start gap-8">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row items-center justify-end mt-5 gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
              >
                cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="destructive"
                type="button"
                onMouseDown={handleDelete}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
