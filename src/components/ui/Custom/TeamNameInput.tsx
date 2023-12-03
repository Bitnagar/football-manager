import { editTeamName } from "@/store/rosterSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import EditPenSvg from "../EditPenSvg";
import { RosterData } from "@/types/shared.types";

export default function TeamNameInput({
  rosterData,
}: {
  rosterData: RosterData;
}) {
  const dispatch = useDispatch();
  const editIconRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className="w-fit flex items-center">
      <input
        type="text"
        name="teamName"
        id="teamName"
        placeholder="Enter a team name."
        defaultValue={rosterData.team}
        className="text-black border-none outline-none focus:outline-transparent bg-none"
        onChange={(e) => {
          dispatch(
            editTeamName({
              teamName: e.target.value,
            })
          );
        }}
        onMouseOver={() => {
          if (rosterData.team !== "My Team") {
            let editIcon = editIconRef.current;
            if (editIcon) {
              editIcon.classList.remove("hidden");
            }
          }
        }}
        onMouseOut={() => {
          if (rosterData.team !== "My Team") {
            let editIcon = editIconRef.current;
            if (editIcon) {
              editIcon.classList.add("hidden");
            }
          }
        }}
      />
      <EditPenSvg ref={editIconRef} />
    </div>
  );
}
