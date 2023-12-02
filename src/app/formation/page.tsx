"use client";
import { useSelector } from "react-redux";
import InvalidStartersModal from "@/components/formation/InvalidStartersModal";
import Formation from "@/components/formation/Formation";
import TeamNameInput from "@/components/ui/Custom/TeamNameInput";

export default function Page() {
  const players = useSelector((state: any) => state.players);

  // useEffect(() => {
  //   console.log("formation page rendered");
  // }, []);

  return (
    <main className="flex flex-col items-center w-full relative gap-2 p-10 rounded-lg justify-center">
      <section className="sticky flex w-full justify-between">
        <div>
          <p>Formation Overview</p>
          <TeamNameInput players={players} />
        </div>
      </section>
      {players.data && <Formation players={players} />}
      <InvalidStartersModal players={players} />
    </main>
  );
}
