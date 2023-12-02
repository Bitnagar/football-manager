import { editTeamName } from "@/store/playersSlice";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import EditPenSvg from "../EditPenSvg";

export default function TeamNameInput({ players }: any) {
  const dispatch = useDispatch();
  const editIconRef = useRef<any>(null);
  return (
    <div className="w-fit flex items-center">
      <input
        type="text"
        name="teamName"
        id="teamName"
        placeholder="Enter a team name."
        defaultValue={players.team}
        className="text-black border-none outline-none focus:outline-transparent bg-none"
        onChange={(e) => {
          dispatch(
            editTeamName({
              teamName: e.target.value,
            })
          );
        }}
        onMouseOver={() => {
          if (players.team !== "My Team") {
            let editIcon = editIconRef.current;
            editIcon.classList.remove("hidden");
          }
        }}
        onMouseOut={() => {
          if (players.team !== "My Team") {
            let editIcon = editIconRef.current;
            editIcon.classList.add("hidden");
          }
        }}
      />
      <EditPenSvg ref={editIconRef} />
    </div>
  );
}
