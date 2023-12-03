/* eslint-disable @next/next/no-img-element */
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

  // useEffect(() => {
  //   console.log("roster page rendered");
  // }, []);

  return (
    <>
      <Header
        mutateSearch={mutateSearch}
        search={search}
        rosterData={rosterData}
      />
      <section className="flex flex-col w-full h-full">
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex flex-col gap-5 w-full h-full p-2 overflow-x-scroll">
            {!rosterData?.players && (
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
                  <p>You do not have any rosterData on the roster</p>
                  <ImportTeamModal />
                </div>
              </div>
            )}
            {rosterData &&
              rosterData.players &&
              rosterData.players.length < 1 && (
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
          </div>
        </div>
      </section>
    </>
  );
}
