"use client";
import ImportTeamModal from "@/components/modal/ImportTeamModal";
import { useSelector } from "react-redux";
import Image from "next/image";
import EditPlayerModal from "@/components/modal/ActionsMenu";
import { useState } from "react";
import { PlayerStats } from "@/types/shared.types";
import { RootState } from "@/store/store";
import Header from "@/components/header/Header";

export default function Home() {
  const [search, setSearch] = useState<string>();
  const rosterData = useSelector((state: RootState) => state.rosterData);

  function mutateSearch(string: string) {
    setSearch(string);
  }

  return (
    <>
      <Header
        mutateSearch={mutateSearch}
        search={search}
        rosterData={rosterData}
      />
      <section className="flex flex-col w-full h-[90%] px-5 py-4 bg-neutral-light rounded-md overflow-x-scroll">
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex flex-col gap-5 w-full h-full p-2">
            {rosterData.players.length < 1 && (
              <div className="w-full h-full p-2 grid">
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
              </div>
            )}
            <table>
              <thead className="flex justify-between mb-5">
                <tr>
                  {rosterData.fields.length > 0 &&
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
                  rosterData.players.length > 0 &&
                  rosterData.players.map((player: PlayerStats, key: number) => {
                    return (
                      <tr
                        id="tableRow"
                        style={
                          {
                            "--row-index": `${key * 10}ms`,
                            opacity: 0,
                          } as React.CSSProperties
                        }
                        key={key}
                        className="flex mb-4 text-sm"
                      >
                        <td className="flex items-center w-56 h-fit gap-2 text-sm">
                          <Image
                            src={player["flag_image"]}
                            alt={player["nationality"]}
                            width={24}
                            height={24}
                          />
                          <p>{player["player_name"]}</p>
                        </td>
                        <td className="w-56">{player["jersey_number"]}</td>
                        <td className="w-56">{player["position"]}</td>
                        <td className="w-56">
                          {parseInt(player["height"]) / 100} m
                        </td>
                        <td className="w-56">
                          {player["weight"] === "Unknown"
                            ? player["weight"]
                            : player["weight"] + " kg"}
                        </td>
                        <td className="w-56">{player["nationality"]}</td>
                        <td className="w-56">{player["starter"]}</td>
                        <td className="w-56">{player["appearances"]}</td>
                        <td className="w-56">{player["minutes_played"]}</td>
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
                      player["player_name"].includes(search) ||
                      player["position"].includes(search)
                    ) {
                      return (
                        <tr
                          key={key}
                          className="flex mb-4 text-sm"
                        >
                          <td className="flex items-center w-56 h-fit gap-2 text-sm">
                            <Image
                              src={player["flag_image"]}
                              alt={player["nationality"]}
                              width={24}
                              height={24}
                            />
                            <p>{player["player_name"]}</p>
                          </td>
                          <td className="w-56">{player["jersey_number"]}</td>
                          <td className="w-56">{player["position"]}</td>
                          <td className="w-56">
                            {parseInt(player["height"]) / 100} m
                          </td>
                          <td className="w-56">
                            {player["weight"] === "Unknown"
                              ? player["weight"]
                              : player["weight"] + " kg"}
                          </td>
                          <td className="w-56">{player["nationality"]}</td>
                          <td className="w-56">{player["starter"]}</td>
                          <td className="w-56">{player["appearances"]}</td>
                          <td className="w-56">{player["minutes_played"]}</td>
                          <td>
                            <EditPlayerModal currentPlayer={player} />
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
