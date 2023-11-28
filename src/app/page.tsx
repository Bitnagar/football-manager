/* eslint-disable @next/next/no-img-element */
"use client";
import ImportTeamModal from "@/components/modal/ImportTeamModal";
import { useSelector } from "react-redux";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import EditPlayerModal from "@/components/modal/EditPlayerModal";
import { useState, useRef } from "react";

export default function Home() {
  const players = useSelector((state: any) => state.players);

  const [queryData, setQueryData] = useState<any>();

  // change the state instead
  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      let found: any = [];
      let search = (e.target as HTMLInputElement).value;
      players.data.forEach((obj: any) => {
        if (
          obj["Player Name"].includes(search) ||
          obj["Position"].includes(search)
        ) {
          found.push(obj);
        }
      });
      console.log(found);
      setQueryData(found);
    }
  }

  /* 
    search. How do we build search?
    - when user hits enter, take the input value
    - find the player with that value in the players.data object. 
    - return it and set the state of the search state
    - render the result
  */

  return (
    <main className="flex flex-col items-center w-full overflow-scroll">
      <section className="sticky flex w-full justify-between p-5">
        <div>
          <p>Roster Details</p>
          <Input
            type="text"
            placeholder={"My Team"}
            name="team-name"
          />
        </div>
        <div className="flex">
          <div className="w-fit h-[44px] flex px-4 py-2 items-center rounded-md border">
            <Search />
            <input
              type="text"
              name="search"
              id="search"
              className="w-fit pl-2 border-none focus:outline-transparent"
              onKeyDownCapture={handleSearch}
              disabled={players.data ? false : true}
            />
            <X />
          </div>
          <ImportTeamModal />
        </div>
      </section>
      <section className="flex flex-col gap-5 w-full h-full p-2">
        <table>
          <thead className="flex justify-between mb-5">
            <tr>
              {players.fields &&
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
                      className="text-xs w-56 text-left"
                    >
                      {field}
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody className="flex flex-col justify-between">
            {!queryData &&
              players.data &&
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
            {queryData &&
              queryData.map((obj: any, key: any) => {
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
          </tbody>
        </table>
      </section>
    </main>
  );
}
