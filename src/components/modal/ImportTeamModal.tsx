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
import { addPlayersData } from "@/store/playersSlice";

interface ColumnData {
  [key: string]: string[];
}

export default function ImportTeamModal(): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const [players, setPlayers] = useState<any>();
  const dispatch = useDispatch();

  function dispatchFileSummary(results: any): void {
    let g = 0,
      d = 0,
      m = 0,
      f = 0,
      s = 0,
      total = results.data.length;
    results.data.forEach((data: any) => {
      if (data["Starter"] === "Yes") s++;
      if (data["Position"] === "Goalkeeper") g++;
      if (data["Position"] === "Defender") d++;
      if (data["Position"] === "Midfielder") m++;
      if (data["Position"] === "Forward") f++;
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

  function handleFileUpload(e: any): void {
    e.preventDefault();
    if (e.target.files[0]) {
      const fileName = document.getElementById("filename") as HTMLElement;
      fileName.innerHTML = e.target.files[0].name;

      // parse csv file
      Papa.parse(e.target.files[0], {
        header: true,
        complete: function (results: Papa.ParseResult<unknown>) {
          console.log(results);

          try {
            setError(false);
            // missing values check
            results.data.forEach((data: any) => {
              if (Object.values(data).includes(""))
                throw Error("Missing values found in .csv file.");
            });
            // save file summary in state
            dispatchFileSummary(results);
            setPlayers(results);
          } catch (error) {
            console.error(error);
            setError(true);
          }
        },
      });
    }
  }

  function handleImportConfirm(): void {
    dispatch(addPlayersData(players));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-[44px]"
        >
          Import Team
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Importer</DialogTitle>
        </DialogHeader>
        <span className="">Roster File</span>
        <div
          id="input-file-container"
          className={`flex items-center border gap-10 w-fit rounded-lg pl-2 ${
            error ? "border-red-600" : "border-black"
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
            className={`bg-transparent text-black border ${
              error ? "border-red-600" : "border-black"
            } hover:bg-transparent`}
          >
            Select File
          </Button>
        </div>
        {error && <p>Error</p>}
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
            variant="secondary"
            id="import-confirm"
            className="mt-auto w-fit outline-none bg-transparent text-black text-right ml-auto hover:bg-transparent"
            onClick={handleImportConfirm}
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
  type PlayerMetadata = {
    goalkeepers: number;
    defenders: number;
    midfielders: number;
    forwards: number;
    starters: number;
    total: number;
  };
  const playerMetadata: PlayerMetadata = useSelector(
    (state: any) => state.metadata
  );

  return (
    <div>
      {playerMetadata.total > 0 ? (
        <>
          <p>Total players: {playerMetadata.total}</p>
          <p>Goalkeepers: {playerMetadata.goalkeepers}</p>
          <p>Defenders: {playerMetadata.defenders}</p>
          <p>Midfielders: {playerMetadata.midfielders}</p>
          <p>Forwards: {playerMetadata.forwards}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
