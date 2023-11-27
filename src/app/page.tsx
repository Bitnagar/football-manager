/* eslint-disable @next/next/no-img-element */
"use client";
import ImportTeamModal from "@/components/modal/ImportTeamModal";
import { useSelector } from "react-redux";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import EditPlayerModal from "@/components/modal/EditPlayerModal";

export default function Home() {
  const players = useSelector((state: any) => state.players);

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
          <Input
            type="text"
            placeholder="search"
            name="search"
          />
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
            {players.data &&
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
                      <EditPlayerModal data={obj} />
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
