/* eslint-disable @next/next/no-img-element */
"use client";
import ImportTeamModal from "@/components/modal/ImportTeamModal";
import { useSelector } from "react-redux";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import EditPlayerModal from "@/components/modal/EditPlayerModal";
import { useState, useRef } from "react";
import TeamNameInput from "@/components/ui/Custom/TeamNameInput";

export default function Home() {
  const [search, setSearch] = useState<string>();
  const players = useSelector((state: any) => state.players);
  const searchRef = useRef<any>(null);

  function handleKeyDown(e: any) {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
    if (e.key === "Escape") {
      e.target.value = "";
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
          <TeamNameInput players={players} />
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
              disabled={players.data ? false : true}
            />
            {search ? (
              <X
                onClick={() => {
                  setSearch("");
                  let input = searchRef.current;
                  input.value = "";
                }}
              />
            ) : (
              <span
                className=" cursor-pointer"
                onClick={() => {
                  let input = searchRef.current;
                  if (input.value) {
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
        {!players.data && (
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
        {players.data && players.data.length < 1 && (
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
              {players.data &&
                players.data.length > 0 &&
                players.fields &&
                players.fields.map((field: string, key: number) => {
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
              players.data &&
              players.data.length > 0 &&
              players.data.map((obj: any, key: any) => {
                return (
                  <tr
                    key={key}
                    className="flex mb-2 text-sm"
                  >
                    <td className="flex items-center w-56 h-fit gap-2 text-sm">
                      <Image
                        src={obj["Flag Image"]}
                        alt={obj["Nationality"]}
                        width={24}
                        height={24}
                      />
                      <p>{obj["Player Name"]}</p>
                    </td>
                    <td className="w-56">{obj["Jersey Number"]}</td>
                    <td className="w-56">{obj["Position"]}</td>
                    <td className="w-56">{obj["Height"] / 100} m</td>
                    <td className="w-56">
                      {obj["Weight"] === "Unknown"
                        ? obj["Weight"]
                        : obj["Weight"] + " kg"}
                    </td>
                    <td className="w-56">{obj["Nationality"]}</td>
                    <td className="w-56">{obj["Starter"]}</td>
                    <td className="w-56">{obj["Appearances"]}</td>
                    <td className="w-56">{obj["Minutes Played"]}</td>
                    <td>
                      <EditPlayerModal currentPlayer={obj} />
                    </td>
                  </tr>
                );
              })}
            {search &&
              players.data.length > 0 &&
              players.data.map((obj: any, key: any) => {
                if (
                  obj["Player Name"].includes(search) ||
                  obj["Position"].includes(search)
                ) {
                  return (
                    <tr
                      key={key}
                      className="flex mb-2 text-sm"
                    >
                      <td className="flex items-center w-56 h-fit gap-2 text-sm">
                        <Image
                          src={obj["Flag Image"]}
                          alt={obj["Nationality"]}
                          width={24}
                          height={24}
                        />
                        <p>{obj["Player Name"]}</p>
                      </td>
                      <td className="w-56">{obj["Jersey Number"]}</td>
                      <td className="w-56">{obj["Position"]}</td>
                      <td className="w-56">{obj["Height"] / 100} m</td>
                      <td className="w-56">
                        {obj["Weight"] === "Unknown"
                          ? obj["Weight"]
                          : obj["Weight"] + " kg"}
                      </td>
                      <td className="w-56">{obj["Nationality"]}</td>
                      <td className="w-56">{obj["Starter"]}</td>
                      <td className="w-56">{obj["Appearances"]}</td>
                      <td className="w-56">{obj["Minutes Played"]}</td>
                      <td>
                        <EditPlayerModal currentPlayer={obj} />
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
