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
    <main className="flex flex-col items-center w-full relative gap-2 p-10 rounded-lg justify-center">
      <section className="sticky flex w-full justify-between">
        <div>
          <p>Formation Overview</p>
          <TeamNameInput rosterData={rosterData} />
        </div>
      </section>
      {rosterData.players.length > 0 && <Formation rosterData={rosterData} />}
      <InvalidStartersModal rosterData={rosterData} />
    </main>
  );
}
