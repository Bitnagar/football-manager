/* eslint-disable @next/next/no-img-element */
"use client";
import ImportTeamModal from "@/components/modal/ImportTeamModal";
import { useSelector } from "react-redux";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import EditPlayerModal from "@/components/modal/ActionsMenu";
import { useState, useRef } from "react";
import TeamNameInput from "@/components/ui/Custom/TeamNameInput";
import { PlayerStats } from "@/types/shared.types";
import { RootState } from "@/store/store";

export default function Home() {
  const [search, setSearch] = useState<string>();
  const rosterData = useSelector((state: RootState) => state.rosterData);
  const searchRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
    if (e.key === "Escape") {
      e.currentTarget.value = "";
    }
  }

  // useEffect(() => {
  //   console.log("roster page rendered");
  // }, []);

  return (
    <main className="flex flex-col items-center w-full overflow-scroll">
      <section className="sticky flex w-full justify-between p-5">
        <div>
          <p>Roster Details</p>
          <TeamNameInput rosterData={rosterData} />
        </div>
        <div className="flex">
          <div className="w-fit h-[44px] flex px-4 py-2 items-center rounded-md border">
            <Search />
            <Input
              ref={searchRef}
              type="text"
              name="search"
              id="search"
              className="w-fit pl-2 border-none focus:outline-transparent bg-transparent"
              onKeyDownCapture={handleKeyDown}
              disabled={rosterData && rosterData.players ? false : true}
            />
            {search ? (
              <X
                onClick={() => {
                  setSearch("");
                  let input = searchRef.current;
                  if (input) {
                    input.value = "";
                  }
                }}
              />
            ) : (
              <span
                className=" cursor-pointer"
                onClick={() => {
                  let input = searchRef.current;
                  if (input && input.value) {
                    setSearch(input.value);
                  }
                }}
              >
                Search
              </span>
            )}
          </div>
          <ImportTeamModal />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-full h-full p-2">
        {!rosterData?.players && (
          <section className="w-full h-full p-2 grid">
            <div className="flex w-full justify-between text-xs">
              <p>Player Name</p>
              <p>Jersey Number</p>
              <p>Position</p>
              <p>Height</p>
              <p>Weight</p>
              <p>Nationality</p>
            </div>
            <div className="flex flex-col place-items-center gap-2">
              <p>You do not have any rosterData on the roster</p>
              <ImportTeamModal />
            </div>
          </section>
        )}
        {rosterData && rosterData.players && rosterData.players.length < 1 && (
          <section className="w-full h-full p-2 grid">
            <div className="flex w-full justify-between text-xs">
              <p>Player Name</p>
              <p>Jersey Number</p>
              <p>Position</p>
              <p>Height</p>
              <p>Weight</p>
              <p>Nationality</p>
            </div>
            <div className="flex flex-col place-items-center gap-2">
              <p>You do not have any players on the roster</p>
              <ImportTeamModal />
            </div>
          </section>
        )}
        <table>
          <thead className="flex justify-between mb-5">
            <tr>
              {rosterData &&
                rosterData.players &&
                rosterData.players.length > 0 &&
                rosterData.fields &&
                rosterData.fields.map((field: string, key: number) => {
                  if (field === "Goals ") return;
                  if (field === "Assists") return;
                  if (field === "Clean Sheets") return;
                  if (field === "Saves") return;
                  if (field === "Player Image") return;
                  if (field === "Flag Image") return;
                  return (
                    <th
                      key={key}
                      className="text-xs w-56 text-left font-normal"
                    >
                      {field}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody className="flex flex-col justify-between">
            {!search &&
              rosterData &&
              rosterData.players &&
              rosterData.players.length > 0 &&
              rosterData.players.map((player: PlayerStats, key: number) => {
                return (
                  <tr
                    key={key}
                    className="flex mb-2 text-sm"
                  >
                    <td className="flex items-center w-56 h-fit gap-2 text-sm">
                      <Image
                        src={player["Flag Image"]}
                        alt={player["Nationality"]}
                        width={24}
                        height={24}
                      />
                      <p>{player["Player Name"]}</p>
                    </td>
                    <td className="w-56">{player["Jersey Number"]}</td>
                    <td className="w-56">{player["Position"]}</td>
                    <td className="w-56">{player["Height"] / 100} m</td>
                    <td className="w-56">
                      {player["Weight"] === "Unknown"
                        ? player["Weight"]
                        : player["Weight"] + " kg"}
                    </td>
                    <td className="w-56">{player["Nationality"]}</td>
                    <td className="w-56">{player["Starter"]}</td>
                    <td className="w-56">{player["Appearances"]}</td>
                    <td className="w-56">{player["Minutes Played"]}</td>
                    <td>
                      <EditPlayerModal currentPlayer={player} />
                    </td>
                  </tr>
                );
              })}
            {search &&
              rosterData.players !== undefined &&
              rosterData.players.length > 0 &&
              rosterData.players.map((player: PlayerStats, key: number) => {
                if (
                  player["Player Name"].includes(search) ||
                  player["Position"].includes(search)
                ) {
                  return (
                    <tr
                      key={key}
                      className="flex mb-2 text-sm"
                    >
                      <td className="flex items-center w-56 h-fit gap-2 text-sm">
                        <Image
                          src={player["Flag Image"]}
                          alt={player["Nationality"]}
                          width={24}
                          height={24}
                        />
                        <p>{player["Player Name"]}</p>
                      </td>
                      <td className="w-56">{player["Jersey Number"]}</td>
                      <td className="w-56">{player["Position"]}</td>
                      <td className="w-56">{player["Height"] / 100} m</td>
                      <td className="w-56">
                        {player["Weight"] === "Unknown"
                          ? player["Weight"]
                          : player["Weight"] + " kg"}
                      </td>
                      <td className="w-56">{player["Nationality"]}</td>
                      <td className="w-56">{player["Starter"]}</td>
                      <td className="w-56">{player["Appearances"]}</td>
                      <td className="w-56">{player["Minutes Played"]}</td>
                      <td>
                        <EditPlayerModal currentPlayer={player} />
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
