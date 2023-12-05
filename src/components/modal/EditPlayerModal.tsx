/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { editPlayerData, editStarters } from "@/store/rosterSlice";
import { useDispatch } from "react-redux";
import nations from "@/lib/nationalities.json";
import { editMetadata } from "@/store/metadataSlice";
import store, { RootState } from "@/store/store";
import { PlayerStats, Starters } from "@/types/shared.types";
import EditPenSvg from "../ui/EditPenSvg";
import { DialogClose } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";

type EditableData = {
  yes: boolean;
  no: boolean;
  playerName: string;
  jersey: string;
  height: string;
  weight: string | "Unknown";
  nationality: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
};

export default function EditPlayerModal({
  currentPlayer,
}: {
  currentPlayer: PlayerStats;
}) {
  const dispatch = useDispatch();
  const uniqueKey = currentPlayer["Player Image"];

  // state
  const [mutatedPlayerData, setMutatedPlayerData] = useState<EditableData>({
    yes: currentPlayer["Starter"] === "Yes",
    no: currentPlayer["Starter"] === "No",
    playerName: currentPlayer["Player Name"],
    jersey: currentPlayer["Jersey Number"],
    height: currentPlayer["Height"],
    weight: currentPlayer["Weight"],
    nationality: currentPlayer["Nationality"],
    position: currentPlayer["Position"],
  });

  function select(state: RootState): PlayerStats[] {
    return state.rosterData.players;
  }

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (Object.values(mutatedPlayerData).includes("")) {
      toast.error("Failed to edit player. Make sure to fill all values.");
      return;
    } else {
      dispatch(
        editPlayerData({
          yes: mutatedPlayerData.yes,
          no: mutatedPlayerData.no,
          playerName: mutatedPlayerData.playerName,
          jersey: mutatedPlayerData.jersey,
          height: mutatedPlayerData.height,
          weight: mutatedPlayerData.weight,
          nationality: mutatedPlayerData.nationality,
          position: mutatedPlayerData.position,
          uniqueKey: uniqueKey,
        })
      );
      let currentValue = select(store.getState());
      dispatchFileSummary(currentValue);
      dispatchStarters(currentValue);
      toast.success("Player edited successfully.");
    }
  }

  function dispatchStarters(currentValue: PlayerStats[]) {
    let starters = {
      goalkeeper: [],
      defenders: [],
      midfielders: [],
      forwards: [],
    } as Starters;
    currentValue.forEach((player: PlayerStats) => {
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
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center">
            <EditPenSvg />
            <Button
              type="button"
              variant={"simple"}
            >
              Edit Player
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[480px] lg:h-fit flex flex-col p-6 bg-neutral-light rounded-md">
          <DialogHeader className="items-start">
            <DialogTitle>Edit Player</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex w-full items-center justify-between gap-4 lg:mb-2 xl:mb-4">
              <div className="flex flex-col gap-2 ">
                <Label
                  htmlFor="playerName"
                  className=" self-start"
                >
                  Player Name
                </Label>
                <Input
                  name="playerName"
                  id="playerName"
                  className="col-span-3 w-[274px]"
                  defaultValue={currentPlayer["Player Name"]}
                  onChange={(e) => {
                    setMutatedPlayerData((prev) => {
                      return {
                        ...prev,
                        playerName: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <Label
                  htmlFor="jerseyNumber"
                  className=" self-start"
                >
                  Jersey Number
                </Label>
                <Input
                  id="jerseyNumber"
                  name="jerseyNumber"
                  type="number"
                  className="col-span-3"
                  defaultValue={currentPlayer["Jersey Number"]}
                  onChange={(e) => {
                    setMutatedPlayerData((prev) => {
                      return {
                        ...prev,
                        jersey: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-4 lg:mb-2 xl:mb-4">
              <div className="flex flex-col gap-2 w-full">
                <Label
                  htmlFor="height"
                  className=" self-start"
                >
                  Height
                </Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  className="col-span-3"
                  defaultValue={currentPlayer["Height"]}
                  onChange={(e) => {
                    setMutatedPlayerData((prev) => {
                      return {
                        ...prev,
                        height: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label
                  htmlFor="weight"
                  className=" self-start"
                >
                  Weight
                </Label>
                <Input
                  id="weight"
                  name="weight"
                  className="col-span-3"
                  defaultValue={currentPlayer["Weight"]}
                  onChange={(e) => {
                    setMutatedPlayerData((prev: EditableData) => {
                      return {
                        ...prev,
                        weight: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-4 lg:mb-2 xl:mb-4">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="nationality"
                  className=" self-start"
                >
                  Nationality
                </Label>
                <Select
                  name="nationality"
                  onValueChange={(e) => {
                    setMutatedPlayerData((prev: EditableData) => {
                      return {
                        ...prev,
                        nationality: e,
                      };
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={currentPlayer["Nationality"]} />
                  </SelectTrigger>
                  <SelectContent>
                    {nations.map((nation: string, key: number) => {
                      return (
                        <SelectItem
                          key={key}
                          value={nation}
                        >
                          {nation}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-4 lg:mb-2 xl:mb-4">
              <div className="w-full flex flex-col gap-2">
                <Label
                  htmlFor="position"
                  className=" self-start"
                >
                  Position
                </Label>
                <Select
                  name="position"
                  onValueChange={(
                    e: "Goalkeeper" | "Defender" | "Midfielder" | "Forward"
                  ) => {
                    setMutatedPlayerData((prev: EditableData): EditableData => {
                      return {
                        ...prev,
                        position: e,
                      };
                    });
                  }}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder={mutatedPlayerData.position} />
                  </SelectTrigger>
                  <SelectContent>
                    {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(
                      (pos: string, key: number) => {
                        return (
                          <SelectItem
                            key={key}
                            value={pos}
                          >
                            {pos}
                          </SelectItem>
                        );
                      }
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex w-full items-center justify-start gap-4">
              <div className="w-full flex flex-col">
                <Label className="self-start">Starter</Label>
                <div className="flex gap-4 pt-4 items-center">
                  <input
                    id="no"
                    type="radio"
                    name="no"
                    checked={mutatedPlayerData.no}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setMutatedPlayerData((prev) => {
                        return {
                          ...prev,
                          no: event.target.checked,
                          yes: false,
                        };
                      });
                    }}
                  />
                  <Label htmlFor="no">No</Label>
                  <input
                    id="yes"
                    type="radio"
                    name="yes"
                    checked={mutatedPlayerData.yes}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setMutatedPlayerData((prev) => {
                        return {
                          ...prev,
                          yes: event.target.checked,
                          no: false,
                        };
                      });
                    }}
                  />
                  <Label htmlFor="yes">Yes</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                onMouseDown={handleEdit}
                className=" transform translate-y-[-14px] w-fit self-end"
              >
                Edit Player
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
