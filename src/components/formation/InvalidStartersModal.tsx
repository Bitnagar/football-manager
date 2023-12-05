import { RosterData } from "@/types/shared.types";
import Image from "next/image";

export default function InvalidDataModal({
  rosterData,
}: {
  rosterData: RosterData;
}) {
  const MAX_Goalkeeper = 1;
  const MAX_Forwards = 3;
  const MAX_Defenders = 4;
  const MAX_Midfielders = 3;

  if (rosterData.players.length < 1) {
    return (
      <>
        <div className="relative w-full h-full flex items-center justify-center p-8 bg-neutral-light rounded-md">
          <div className="w-full h-fit flex items-center justify-around gap-10">
            <div className="relative lg:min-w-[625px] lg:min-h-[420px] xl:min-w-[808px] xl:h-[541px]">
              <Image
                src={"/assets/Field.png"}
                alt="field image"
                width={808}
                height={541}
                className="absolute top-0 left-0"
                priority={true}
              />
            </div>
            <div className=" lg:w-[300px] lg:h-[422px] lg:text-xs xl:text-sm xl:min-w-[322px] xl:h-[541px] flex flex-col bg-background text-white rounded-sm p-6">
              <div className=" w-full h-3/4">
                <div>
                  <h1></h1>
                </div>
                <div></div>
                <div></div>
              </div>
              <hr />
              <div className="w-full h-1/4"></div>
            </div>
          </div>
        </div>
        <div className="absolute  w-full h-full  text-white text-center  flex items-center justify-center rounded-md">
          <div className="w-[389px] h-[127px] flex flex-col items-center justify-center bg-neutral-light shadow-custom p-6 rounded-lg ">
            <div>
              <h1>⚠️ No player data found</h1>
            </div>
            <div>
              <h1>Please import your roster first</h1>
            </div>
          </div>
        </div>
      </>
    );
  } else if (
    rosterData.starters.goalkeeper.length < MAX_Goalkeeper ||
    rosterData.starters.defenders.length < MAX_Defenders ||
    rosterData.starters.forwards.length < MAX_Forwards ||
    rosterData.starters.midfielders.length < MAX_Midfielders
  ) {
    return (
      <>
        <div className="relative w-full h-full flex items-center justify-center p-8 bg-neutral-light rounded-md">
          <div className="flex items-center gap-10">
            <div className="relative lg:min-w-[625px] lg:min-h-[420px] xl:min-w-[808px] xl:h-[541px]">
              <Image
                src={"/assets/Field.png"}
                alt="field image"
                width={808}
                height={541}
                className="absolute top-0 left-0"
                priority={true}
              />
            </div>
            <div className=" lg:w-[300px] lg:h-[422px] lg:text-xs xl:text-sm xl:min-w-[322px] xl:h-[541px] flex flex-col bg-background rounded-sm p-6">
              <div className=" w-full h-3/4">
                <div>
                  <h1></h1>
                </div>
                <div></div>
                <div></div>
              </div>
              <hr />
              <div className="w-full h-1/4"></div>
            </div>
          </div>
        </div>
        <div className="absolute  w-full h-full  text-white text-center  flex items-center justify-center">
          <div className="w-[389px] h-[127px] flex flex-col items-center justify-center bg-neutral-light shadow-custom p-6 rounded-lg ">
            <div>
              <h1>⚠️ Not enough starters</h1>
            </div>
            <div>
              <h1>
                Your team doesn’t have enough starters for one or more of the
                positions in the 4-3-3 formation
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  } else if (
    rosterData.starters.goalkeeper.length > MAX_Goalkeeper ||
    rosterData.starters.defenders.length > MAX_Defenders ||
    rosterData.starters.forwards.length > MAX_Forwards ||
    rosterData.starters.midfielders.length > MAX_Midfielders
  ) {
    return (
      <>
        <div className="relative w-full h-full flex items-center justify-center p-8 bg-neutral-light rounded-md">
          <div className="flex items-center gap-10">
            <div className="relative lg:min-w-[625px] lg:min-h-[420px] xl:min-w-[808px] xl:h-[541px]">
              <Image
                src={"/assets/Field.png"}
                alt="field image"
                width={808}
                height={541}
                className="absolute top-0 left-0"
                priority={true}
              />
            </div>
            <div className=" lg:w-[300px] lg:h-[422px] lg:text-xs xl:text-sm xl:min-w-[322px] xl:h-[541px] flex flex-col bg-background rounded-sm p-6">
              <div className=" w-full h-3/4">
                <div>
                  <h1></h1>
                </div>
                <div></div>
                <div></div>
              </div>
              <hr />
              <div className="w-full h-1/4"></div>
            </div>
          </div>
        </div>
        <div className="absolute  w-full h-full  text-white text-center  flex items-center justify-center">
          <div className="w-[379px] h-[127px] flex flex-col items-center justify-center bg-neutral-light shadow-custom p-6 rounded-lg ">
            <div>
              <h1>⚠️ There are too many starters</h1>
            </div>
            <div>
              <h1>
                Your team has too many starters for one or more of the positions
                in the 4-3-3 formation.
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
}
