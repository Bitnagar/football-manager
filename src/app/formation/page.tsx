"use client";
import EditPenSvg from "@/components/ui/EditPenSvg";
import { editTeamName } from "@/store/playersSlice";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import InvalidStartersModal from "@/components/formation/InvalidStartersModal";
import Formation from "@/components/formation/Formation";

export default function Page() {
  const players = useSelector((state: any) => state.players);
  const dispatch = useDispatch();
  const editIconRef = useRef<any>(null);

  // useEffect(() => {
  //   console.log("formation page rendered");
  // }, []);

  return (
    <main className="flex flex-col items-center w-full relative gap-2 p-10 rounded-lg justify-center">
      <section className="sticky flex w-full justify-between">
        <div className="">
          <p>Formation Overview</p>
          <div className="w-fit flex items-center">
            <div className="w-fit flex items-center">
              <input
                type="text"
                name="teamName"
                id="teamName"
                placeholder="Enter a team name."
                defaultValue={players.team}
                className="border-none outline-none bg-transparent focus:outline-transparent bg-none"
                onChange={(e) => {
                  dispatch(
                    editTeamName({
                      teamName: e.target.value,
                    })
                  );
                }}
              />
              <EditPenSvg ref={editIconRef} />
            </div>
          </div>
        </div>
      </section>
      {players.data && <Formation players={players} />}
      <InvalidStartersModal players={players} />
    </main>
  );
}
