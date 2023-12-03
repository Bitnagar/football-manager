import ImportTeamModal from "@/components/modal/ImportTeamModal";

import TeamNameInput from "../ui/Custom/TeamNameInput";
import { Search, X } from "lucide-react";
// import { Input } from "../ui/input";
import { useRef } from "react";
import { RosterData } from "@/types/shared.types";
import { Button } from "../ui/button";

type Props = {
  rosterData: RosterData;
  mutateSearch: any;
  search: any;
};

export default function Header({ rosterData, mutateSearch, search }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      mutateSearch(e.currentTarget.value);
    }
    if (e.key === "Escape") {
      e.currentTarget.value = "";
    }
  }

  return (
    <header className="flex max-w-screen justify-between p-5">
      <div>
        <p>Roster Details</p>
        <TeamNameInput rosterData={rosterData} />
      </div>
      <div className="flex">
        <div className="w-fit h-[44px] flex px-4 py-2 items-center rounded-md border">
          <Search />
          <input
            ref={searchRef}
            type="text"
            name="search"
            id="search"
            className="w-fit pl-2 border-none focus:outline-transparent focus:bg-transparent"
            onKeyDownCapture={handleKeyDown}
            disabled={rosterData.players.length > 0 ? false : true}
          />
          {search ? (
            <X
              onClick={() => {
                mutateSearch("");
                let input = searchRef.current;
                if (input) {
                  input.value = "";
                }
              }}
            />
          ) : (
            <Button
              type="button"
              className=""
              onClick={() => {
                let input = searchRef.current;
                if (input && input.value) {
                  mutateSearch(input.value);
                }
              }}
              disabled={rosterData.players.length > 0 ? false : true}
            >
              Search
            </Button>
          )}
        </div>
        <ImportTeamModal />
      </div>
    </header>
  );
}
