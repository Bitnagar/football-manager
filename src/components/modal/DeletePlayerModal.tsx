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
import { useToast } from "../ui/use-toast";

export default function DeletePlayerModal({ currentPlayer }: any) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // unique key for editing and deleting the player
  // - Only Player Images were unique in csv file.
  const uniqueKey = currentPlayer["Player Image"];

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
      if (Player["Starter"] === "Yes") s++;
      if (Player["Position"] === "Goalkeeper") g++;
      if (Player["Position"] === "Defender") d++;
      if (Player["Position"] === "Midfielder") m++;
      if (Player["Position"] === "Forward") f++;
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
      if (player["Starter"] === "Yes") {
        switch (player["Position"]) {
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
    toast({
      description: "Player Deleted ✅",
    });
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>Delete Player</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
              >
                cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant="secondary"
                type="submit"
                onMouseDown={handleDelete}
              >
                close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
