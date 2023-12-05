import ImportTeamModal from "@/components/modal/ImportTeamModal";
import TeamNameInput from "../ui/Custom/TeamNameInput";
import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { RosterData } from "@/types/shared.types";
import { Button } from "../ui/button";

type Props = {
  rosterData: RosterData;
  mutateSearch: (string: string) => void;
  search: string | undefined;
};

export default function Header({ rosterData, mutateSearch, search }: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchString, setSearchString] = useState<string>("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      mutateSearch(e.currentTarget.value);
    }
    if (e.key === "Escape") {
      e.currentTarget.value = "";
    }
  }

  return (
    <header className="flex max-w-screen justify-between pb-6">
      <div>
        <p className="text-primary-orange text-xs">Roster Details</p>
        <TeamNameInput rosterData={rosterData} />
      </div>
      <div className="lg:w-[260px] lg:h-[36px] xl:w-[388px] h-[44px] flex justify-end gap-2">
        <div className="text-sm flex px-4 py-2 items-center rounded-md border">
          <Search />
          <input
            ref={searchRef}
            type="text"
            name="search"
            id="search"
            placeholder="Find Player"
            className="pl-3 h-full border-none bg-transparent focus:outline-transparent focus:bg-transparent"
            onKeyDownCapture={handleKeyDown}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
            disabled={rosterData.players.length > 0 ? false : true}
          />
          {search && (
            <X
              onClick={() => {
                mutateSearch("");
                let input = searchRef.current;
                if (input) {
                  input.value = "";
                  setSearchString("");
                }
              }}
            />
          )}
          {searchString && !search && (
            <Button
              variant={"ghost"}
              type="button"
              className="text-primary-orange"
              onClick={() => {
                let input = searchRef.current;
                if (input && input.value) {
                  mutateSearch(input.value);
                }
              }}
            >
              Search
            </Button>
          )}
        </div>
        <ImportTeamModal header={true} />
      </div>
    </header>
  );
}
