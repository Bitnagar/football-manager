/* eslint-disable react/no-unescaped-entities */
"use client";
import { MoreHorizontal } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { PlayerStats } from "@/types/shared.types";
import EditPlayerModal from "./EditPlayerModal";
import DeletePlayerModal from "./DeletePlayerModal";

export default function ActionsMenu({
  currentPlayer,
}: {
  currentPlayer: PlayerStats;
}) {
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
            <EditPlayerModal currentPlayer={currentPlayer} />
            <DeletePlayerModal currentPlayer={currentPlayer} />
          </div>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
