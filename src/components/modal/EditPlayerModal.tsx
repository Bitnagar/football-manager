/* eslint-disable react/no-unescaped-entities */
"use client";
import { MoreHorizontal } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import {
  editPlayerData,
  deletePlayerData,
  editStarters,
} from "@/store/rosterSlice";
import { useDispatch } from "react-redux";
import nations from "@/lib/nationalities.json";
import { editMetadata } from "@/store/metadataSlice";
import store, { RootState } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";
import { PlayerStats, Starters } from "@/types/shared.types";

type EditableData = {
  yes: boolean;
  no: boolean;
  playerName: string;
  jersey: string;
  height: number;
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
  const { toast } = useToast();

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

  // unique key for editing and deleting the player
  // - Only Player Images were unique in csv file.
  const uniqueKey = currentPlayer["Player Image"];

  function select(state: RootState): PlayerStats[] {
    return state.rosterData.players;
  }

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (mutatedPlayerData.yes === false && mutatedPlayerData.no === false) {
      toast({
        title: "Unconfirmed Starter status.",
        description: "Please tick an option for starter.",
      });
      return;
    } else if (Object.values(mutatedPlayerData).includes("")) {
      toast({
        title: "Values missing!",
        description: "Please make sure to fill all the values",
      });
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
      toast({
        description: "Changes saved ✅",
      });
    }
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
      deletePlayerData({ uniqueKey: uniqueKey, currentPlayer: currentPlayer })
    );
    let updatedPlayers = select(store.getState());
    dispatchFileSummary(updatedPlayers);
    console.log(updatedPlayers);

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
  }

  // useEffect(() => {
  //   console.log("editPlayermodal rendered");
  // });

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <MoreHorizontal />
        </MenubarTrigger>
        <MenubarContent className="w-[233px] h-[167px] p-4 flex flex-col gap-2">
          <h1>Actions</h1>
          <div className="flex flex-col gap-2 w-fit">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Player</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[480px] h-[582px] flex flex-col">
                <DialogHeader>
                  <DialogTitle>Edit Player</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex w-fit items-center justify-start gap-4">
                    <div>
                      <Label className=" self-start">Player Name</Label>
                      <Input
                        className="col-span-3"
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
                    <div>
                      <Label className=" self-start">Jersey Number</Label>
                      <Input
                        className="col-span-3"
                        defaultValue={currentPlayer["Jersey Number"]}
                        type="text"
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
                  <div className="flex w-fit items-center justify-start gap-4">
                    <div>
                      <Label className=" self-start">Height</Label>
                      <Input
                        className="col-span-3"
                        defaultValue={currentPlayer["Height"]}
                        onChange={(e) => {
                          setMutatedPlayerData((prev) => {
                            return {
                              ...prev,
                              height: parseFloat(e.target.value),
                            };
                          });
                        }}
                      />
                    </div>
                    <div>
                      <Label className=" self-start">Weight</Label>
                      <Input
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
                  <div className="flex w-full items-center justify-start gap-4">
                    <div className="w-full">
                      <Label className=" self-start">Nationality</Label>
                      <Select
                        onValueChange={(e) => {
                          setMutatedPlayerData((prev: EditableData) => {
                            return {
                              ...prev,
                              nationality: e,
                            };
                          });
                        }}
                      >
                        <SelectTrigger className="">
                          <SelectValue
                            placeholder={currentPlayer["Nationality"]}
                          />
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
                  <div className="flex w-full items-center justify-start gap-4">
                    <div className="w-full">
                      <Label className=" self-start">Position</Label>
                      <Select
                        onValueChange={(
                          e:
                            | "Goalkeeper"
                            | "Defender"
                            | "Midfielder"
                            | "Forward"
                        ) => {
                          setMutatedPlayerData(
                            (prev: EditableData): EditableData => {
                              return {
                                ...prev,
                                position: e,
                              };
                            }
                          );
                        }}
                      >
                        <SelectTrigger className="">
                          <SelectValue
                            placeholder={mutatedPlayerData.position}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Goalkeeper",
                            "Defender",
                            "Midfielder",
                            "Forward",
                          ].map((pos: string, key: number) => {
                            return (
                              <SelectItem
                                key={key}
                                value={pos}
                              >
                                {pos}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start gap-4">
                    <div className="w-full flex flex-col">
                      <h1>Starter</h1>
                      <div className="flex gap-4 pt-4">
                        <Label htmlFor="no">No</Label>
                        <Checkbox
                          id="no"
                          checked={mutatedPlayerData.no}
                          onCheckedChange={(e: boolean) => {
                            setMutatedPlayerData((prev) => {
                              return {
                                ...prev,
                                no: e,
                                yes: false,
                              };
                            });
                          }}
                        />
                        <Label htmlFor="yes">Yes</Label>
                        <Checkbox
                          id="yes"
                          checked={mutatedPlayerData.yes}
                          onCheckedChange={(e: boolean) => {
                            setMutatedPlayerData((prev) => {
                              return {
                                ...prev,
                                yes: e,
                                no: false,
                              };
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={handleEdit}
                  >
                    Edit Player
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger>Delete Player</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    type="submit"
                    variant={"secondary"}
                  >
                    cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
