"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

export default function FormationIcon({}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={"/formation"}
      className="flex items-center gap-2"
    >
      <svg
        width="4"
        height="4"
        xmlns="http://www.w3.org/2000/svg"
        className={
          pathname === "/formation" ? "fill-primary-orange" : " invisible"
        }
      >
        <circle
          cx="2"
          cy="2"
          r="2"
        />
      </svg>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={
          pathname === "/formation" ? "fill-primary-orange" : "fill-[#69563A]"
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.76953 7.375C8.76953 8.35938 7.97656 9.125 7.01953 9.125C6.03516 9.125 5.26953 8.35938 5.26953 7.375C5.26953 6.41797 6.03516 5.625 7.01953 5.625C7.97656 5.625 8.76953 6.41797 8.76953 7.375ZM3.875 11.75C3.875 10.793 4.64062 10 5.625 10H8.25C8.57812 10 8.87891 10.1094 9.15234 10.2734C8.14062 10.6836 7.34766 11.5586 7.07422 12.625H4.75C4.25781 12.625 3.875 12.2422 3.875 11.75ZM14.3477 10.2461C14.6211 10.1094 14.9219 10 15.25 10H17.875C18.832 10 19.625 10.793 19.625 11.75C19.625 12.2422 19.2148 12.625 18.75 12.625H16.4805C16.207 11.5312 15.3867 10.6562 14.3477 10.2461ZM13.6914 10.957C14.5664 11.1484 15.2773 11.8047 15.5781 12.625C15.6602 12.8984 15.7148 13.1992 15.7148 13.5C15.7148 13.9922 15.332 14.375 14.8398 14.375H8.71484C8.22266 14.375 7.83984 13.9922 7.83984 13.5C7.83984 13.1992 7.89453 12.8984 8.00391 12.625C8.27734 11.832 8.96094 11.2031 9.80859 10.9844C10 10.9297 10.2461 10.875 10.4648 10.875H13.0898C13.3086 10.875 13.5 10.9023 13.6914 10.957ZM18.3945 7.375C18.3945 8.35938 17.6016 9.125 16.6445 9.125C15.6602 9.125 14.8945 8.35938 14.8945 7.375C14.8945 6.41797 15.6602 5.625 16.6445 5.625C17.6016 5.625 18.3945 6.41797 18.3945 7.375ZM9.58984 7.8125C9.58984 6.60938 10.5742 5.625 11.7773 5.625C12.9805 5.625 13.9648 6.60938 13.9648 7.8125C13.9648 9.04297 12.9805 10 11.7773 10C10.5742 10 9.58984 9.04297 9.58984 7.8125ZM19.625 16.125C20.0898 16.125 20.5 16.5352 20.5 17C20.5 17.4922 20.0898 17.875 19.625 17.875H3.875C3.38281 17.875 3 17.4922 3 17C3 16.5352 3.38281 16.125 3.875 16.125H19.625Z"
          fill=""
        />
      </svg>
    </Link>
  );
}
