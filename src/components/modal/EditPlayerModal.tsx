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
import { useState } from "react";
import { editPlayerData, deletePlayerData } from "@/store/playersSlice";
import { useDispatch } from "react-redux";

export default function EditPlayerModal({ data }: any) {
  const dispatch = useDispatch();
  const [checkboxes, setCheckboxes] = useState({
    yes: data["Starter"] === "Yes",
    no: data["Starter"] === "No",
  });
  const [jersey, setJersey] = useState(data["Jersey Number"]);
  const uniqueKey = data["Player Image"];

  function handleEdit() {
    dispatch(
      editPlayerData({
        checkboxes: checkboxes,
        jersey: jersey,
        uniqueKey: uniqueKey,
      })
    );
  }

  function handleDelete() {
    dispatch(deletePlayerData({ uniqueKey: uniqueKey, currentPlayer: data }));
  }

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
                        defaultValue={data["Player Name"]}
                        disabled
                      />
                    </div>
                    <div>
                      <Label className=" self-start">Jersey Number</Label>
                      <Input
                        className="col-span-3"
                        defaultValue={data["Jersey Number"]}
                        type="text"
                        onChange={(e) => {
                          setJersey(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex w-fit items-center justify-start gap-4">
                    <div>
                      <Label className=" self-start">Height</Label>
                      <Input
                        className="col-span-3"
                        defaultValue={data["Height"]}
                      />
                    </div>
                    <div>
                      <Label className=" self-start">Weight</Label>
                      <Input
                        className="col-span-3"
                        defaultValue={data["Weight"]}
                      />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start gap-4">
                    <div className="w-full">
                      <Label className=" self-start">Nationality</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-start gap-4">
                    <div className="w-full">
                      <Label className=" self-start">Position</Label>
                      <Select>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
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
                          checked={checkboxes.no}
                          onCheckedChange={(e: boolean) => {
                            setCheckboxes({
                              yes: false,
                              no: e,
                            });
                          }}
                        />
                        <Label htmlFor="yes">Yes</Label>
                        <Checkbox
                          id="yes"
                          checked={checkboxes.yes}
                          onCheckedChange={(e: boolean) => {
                            setCheckboxes({
                              yes: e,
                              no: false,
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

/* 
    How do we edit?
    - collect all the filled values
    - dispatch unique key and all values to reducer
    - make a new reducer to update the state
    - update the player.data where unique key
*/
