"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMetadata } from "@/store/metadataSlice";
import { addPlayersData, addStarters } from "@/store/rosterSlice";
import { PlayerStats, Starters } from "@/types/shared.types";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";

type RawCsvData = {
  data: Array<PlayerStats>;
  errors: any[];
  meta: {};
};

type PlayerMetadata = {
  goalkeepers: number;
  defenders: number;
  midfielders: number;
  forwards: number;
  starters: number;
  total: number;
};

export default function ImportTeamModal({
  header,
}: {
  header?: boolean;
}): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const [players, setPlayers] = useState<RawCsvData | null>();
  const dispatch = useDispatch();
  const rosterData = useSelector((state: RootState) => state.rosterData);

  function dispatchFileSummary(result: RawCsvData): void {
    let g = 0,
      d = 0,
      m = 0,
      f = 0,
      s = 0,
      total = result.data.length;
    result.data.forEach((data: PlayerStats) => {
      if (data["starter"] === "Yes") s++;
      if (data["position"] === "Goalkeeper") g++;
      if (data["position"] === "Defender") d++;
      if (data["position"] === "Midfielder") m++;
      if (data["position"] === "Forward") f++;
    });
    dispatch(
      addMetadata({
        data: {
          defenders: d,
          goalkeepers: g,
          midfielders: m,
          forwards: f,
          starters: s,
          total: total,
        },
      })
    );
  }

  function toSnakeCase(str: string) {
    return str.replace(/\s+/g, "_").toLowerCase();
  }
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileName = document.getElementById("filename") as HTMLElement;
      const selectedFile = files[0];
      fileName.innerHTML = selectedFile.name;

      // parse csv file
      Papa.parse(selectedFile, {
        header: true,
        complete: (result: RawCsvData) => {
          try {
            // lowercase keys of players data
            const lowerCasedData: PlayerStats[] = result.data.map(
              (row: PlayerStats, index: number) => {
                const processedRow = {} as PlayerStats;
                for (const key in row) {
                  if (row[key] === "")
                    throw Error("Missing values found in .csv file.");
                  if (row.hasOwnProperty(key)) {
                    const lowercasedKey = key.toLowerCase();
                    const lowercasedValue = row[key];
                    const snakeCaseKey = toSnakeCase(lowercasedKey);
                    processedRow[snakeCaseKey] = lowercasedValue;
                  }
                }
                processedRow["uniqueKey"] = index.toString();
                return processedRow;
              }
            );
            result.data = lowerCasedData;
            dispatchFileSummary(result);
            setPlayers(result);
          } catch (error) {
            console.error(error);
            setError(true);
          }
        },
      });
    }
  }

  function handleImportConfirm(): void {
    if (players) {
      dispatch(addPlayersData(players));
      let starters = {
        goalkeeper: [],
        defenders: [],
        midfielders: [],
        forwards: [],
      } as Starters;
      players.data.forEach((player: PlayerStats) => {
        if (player["starter"] === "Yes") {
          switch (player["position"]) {
            case "Goalkeeper":
              starters.goalkeeper.push(player);
              break;
            case "Defender":
              starters.defenders.push(player);
              break;
            case "Midfielder":
              starters.midfielders.push(player);
              break;
            case "Forward":
              starters.forwards.push(player);
              break;
            default:
              break;
          }
        }
      });
      dispatch(addStarters(starters));
    } else {
      toast.error("No file selected");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"sm"}
          variant={header ? "default" : "simple"}
          className={`${header ? "" : " text-primary-orange"}`}
        >
          {header && rosterData.players.length > 0
            ? "Re-import Team"
            : "Import Team"}
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-[750px] lg:h-[470px] xl:max-w-[800px] xl:h-[600px] flex flex-col bg-neutral-light border-none shadow-custom rounded-md">
        <DialogHeader>
          <DialogTitle>Importer</DialogTitle>
        </DialogHeader>
        <span>Roster File</span>
        <div
          id="input-file-container"
          className={`flex items-center border gap-10 w-fit rounded-lg pl-3 ${
            error ? "border-red-600" : "border-border"
          }`}
        >
          <span id="filename">No file chosen</span>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            accept=".csv"
            onChange={handleFileUpload}
          />
          <Button
            id="import-dialog"
            onClick={() => {
              document.getElementById("file")?.click();
            }}
            className={`bg-transparent text-text-normal border ${
              error ? "border-primary-red" : "border-border"
            } hover:bg-transparent`}
          >
            Select File
          </Button>
        </div>
        {error && <p className="text-primary-red font-medium">Error</p>}
        <p
          className="col-span-4"
          id="tip"
        >
          {error
            ? "Your sheet is missing data. Please ensure all cells are filled out."
            : "File must be in .csv format"}
        </p>
        {!error && <FileSummary />}
        <DialogClose asChild>
          <Button
            type="button"
            variant={players ? "default" : "ghost"}
            id="import-confirm"
            className="mt-auto w-fit outline-none text-right ml-auto"
            onClick={handleImportConfirm}
            disabled={players ? false : true}
          >
            Import
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

// player Summary inside import modal component
function FileSummary(): JSX.Element {
  const playerMetadata: PlayerMetadata = useSelector(
    (state: RootState) => state.metadata
  );

  return (
    <>
      {playerMetadata.total > 0 && (
        <div className="flex flex-col gap-5 mt-8">
          <h1>File Summary</h1>
          <div className="flex w-full items-center gap-16">
            <div>
              <p>Total players</p>
              <br />
              <p className="font-semibold">{playerMetadata.total}</p>
            </div>
            <div>
              <p>Goalkeepers</p>
              <br />
              <p className="font-semibold">{playerMetadata.goalkeepers}</p>
            </div>
            <div>
              <p>Defenders</p>
              <br />
              <p className="font-semibold">{playerMetadata.defenders}</p>
            </div>
            <div>
              <p>Midfielders</p>
              <br />
              <p className="font-semibold">{playerMetadata.midfielders}</p>
            </div>
            <div>
              <p>Forwards</p>
              <br />
              <p className="font-semibold">{playerMetadata.forwards}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
