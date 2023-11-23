"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { useState } from "react";

export default function ImportTeamModal() {
  function handleFileUpload(e: any) {
    const fileName = document.getElementById("filename") as HTMLElement;
    fileName.innerHTML = e.target.files[0].name;
    Papa.parse(e.target.files[0], {
      complete: function (results: any) {
        try {
          // missing values check
          results.data.forEach((data: any) => {
            data.forEach((value: any) => {
              if (value === "") throw Error("empty value found.");
            });
          });
        } catch (error) {
          console.log(error);
          const parent = document.getElementById(
            "input-file-container"
          ) as HTMLElement;
          parent.style.borderColor = `red`;
          const imp = document.getElementById("import") as HTMLElement;
          imp.style.borderColor = `red`;
        }
      },
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Import Team</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Importer</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <span className="">Roster File</span>
        <div
          id="input-file-container"
          className="flex items-center gap-10 border border-black w-fit rounded-lg pl-2"
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
            id="import"
            onClick={() => {
              document.getElementById("file")?.click();
            }}
            className="bg-transparent text-black border border-black hover:bg-transparent"
          >
            Select File
          </Button>
        </div>
        <p
          className="col-span-4"
          id="tip"
        >
          File must be in .csv format
        </p>
        <Button className="mt-auto w-fit outline-none bg-transparent text-black text-right ml-auto hover:bg-transparent">
          Import
        </Button>
      </DialogContent>
    </Dialog>
  );
}
