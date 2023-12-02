import { useEffect, useState } from "react";

export default function InvalidDataModal({ players }: any) {
  const MAX_Goalkeeper = 1;
  const MAX_Forwards = 3;
  const MAX_Defenders = 4;
  const MAX_Midfielders = 3;

  // useEffect(() => {
  //   console.log("invailded modal rendered");
  // }, []);

  // possible BUG
  if (!players.data || players.data.length < 1) {
    return (
      <>
        <section className="flex w-full h-full items-center justify-center bg-[#2D2D2D] p-8">
          <div
            id="formation-container"
            className="w-full h-full"
          ></div>
          <div className=" min-w-[322px] h-[541px] flex flex-col bg-[#222222] rounded-sm p-6">
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
        </section>
        <div className="absolute  w-full h-full  text-white text-center  flex items-center justify-center">
          <div className="w-[389px] h-[127px] flex flex-col items-center justify-center bg-black p-6 rounded-lg ">
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
    players.starters.goalkeeper.length < MAX_Goalkeeper ||
    players.starters.defenders.length < MAX_Defenders ||
    players.starters.forwards.length < MAX_Forwards ||
    players.starters.midfielders.length < MAX_Midfielders
  ) {
    return (
      <>
        <section className="flex w-full h-full items-center justify-center bg-[#2D2D2D] p-8">
          <div
            id="formation-container"
            className="w-full h-full"
          ></div>
          <div className=" min-w-[322px] h-[541px] flex flex-col bg-[#222222] rounded-sm p-6">
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
        </section>
        {players.data && players.starters && (
          <div className="absolute  w-full h-full  text-white text-center  flex items-center justify-center">
            <div className="w-[389px] h-[127px] flex flex-col items-center justify-center bg-black p-6 rounded-lg ">
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
        )}
      </>
    );
  } else if (
    players.starters.goalkeeper.length > MAX_Goalkeeper ||
    players.starters.defenders.length > MAX_Defenders ||
    players.starters.forwards.length > MAX_Forwards ||
    players.starters.midfielders.length > MAX_Midfielders
  ) {
    return (
      <>
        <section className="flex w-full h-full items-center justify-center bg-[#2D2D2D] p-8">
          <div
            id="formation-container"
            className="w-full h-full"
          ></div>
          <div className=" min-w-[322px] h-[541px] flex flex-col bg-[#222222] rounded-sm p-6">
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
        </section>
        {players.data && players.starters && (
          <div className="absolute  w-full h-full  text-white text-center  flex items-center justify-center">
            <div className="w-[379px] h-[127px] flex flex-col items-center justify-center bg-black p-6 rounded-lg ">
              <div>
                <h1>⚠️ There are too many starters</h1>
              </div>
              <div>
                <h1>
                  Your team has too many starters for one or more of the
                  positions in the 4-3-3 formation.
                </h1>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
