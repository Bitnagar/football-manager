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
import { PlayerStats } from "@/types/shared.types";
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

  function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(
      deletePlayerData({
        uniqueKey: uniqueKey,
        currentPlayer: currentPlayer,
      })
    );
    let updatedState = select(store.getState());
    dispatch(editMetadata(updatedState));
    dispatch(editStarters(updatedState));
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
