import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImportTeamModal from "@/components/modal/ImportTeamModal";
export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <section className="flex w-full justify-between p-5">
        <div>
          <p>Roster Details</p>
          <Input
            type="text"
            placeholder={"My Team"}
            name="team-name"
          />
        </div>
        <div className="flex">
          <Input
            type="text"
            placeholder="search"
            name="search"
          />
          <ImportTeamModal />
        </div>
      </section>
      {/* <section className="w-full h-full p-2 grid">
        <div className="flex w-full justify-between">
          <p>Player Name</p>
          <p>Jersey Number</p>
          <p>Position</p>
          <p>Height</p>
          <p>Weight</p>
          <p>Nationality</p>
        </div>
        <div className="flex flex-col place-items-center gap-2">
          <p>You do not have any players on the roster</p>
          <Button>Import Team</Button>
        </div>
      </section> */}
      <section></section>
    </main>
  );
}
