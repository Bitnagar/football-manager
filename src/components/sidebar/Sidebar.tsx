import Image from "next/image";
import FormationIcon from "../ui/Custom/icons/FormationIcon";
import HamburgerIcon from "../ui/Custom/icons/HamburgerIcon";

export default function Sidebar() {
  return (
    <aside className="w-[60px] h-full flex flex-col items-center  p-5 gap-10 bg-[#111111]">
      <Image
        src={"/assets/logo.svg"}
        alt="logo"
        width={100}
        height={100}
      />
      <HamburgerIcon />
      <FormationIcon />
    </aside>
  );
}
