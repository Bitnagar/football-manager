import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-full p-5 gap-10 border border-black">
      <p>Logo</p>
      <Link href={"#"}>Roster</Link>
      <Link href={"#"}>Formation</Link>
    </aside>
  );
}
