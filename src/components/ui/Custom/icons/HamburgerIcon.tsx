"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

export default function FormationIcon() {
  const pathname = usePathname();

  return (
    <Link
      href={"/"}
      className="flex items-center gap-2"
    >
      <svg
        width="4"
        height="4"
        xmlns="http://www.w3.org/2000/svg"
        className={pathname === "/" ? "fill-primary-orange" : " invisible"}
      >
        <circle
          cx="2"
          cy="2"
          r="2"
        />
      </svg>
      <Menu
        height={16}
        className={pathname === "/" ? "text-primary-orange" : "fill-[#69563A]"}
      />
    </Link>
  );
}
