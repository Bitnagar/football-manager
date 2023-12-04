"use client";
import { useSelector } from "react-redux";
import InvalidStartersModal from "@/components/formation/InvalidStartersModal";
import Formation from "@/components/formation/Formation";
import TeamNameInput from "@/components/ui/Custom/TeamNameInput";
import { RootState } from "@/store/store";

export default function Page() {
  const rosterData = useSelector((state: RootState) => state.rosterData);

  // useEffect(() => {
  //   console.log("formation page rendered");
  // }, []);

  return (
    <section className="flex flex-col items-center w-full h-full relative gap-2 rounded-lg justify-center">
      <div className="flex w-full justify-between">
        <div>
          <p className="text-primary-orange text-xs">Formation Overview</p>
          <TeamNameInput rosterData={rosterData} />
        </div>
      </div>
      {rosterData.players.length > 0 && <Formation rosterData={rosterData} />}
      <InvalidStartersModal rosterData={rosterData} />
    </section>
  );
}
