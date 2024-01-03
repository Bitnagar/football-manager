import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import ReduxProvider from "@/components/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football Manager | Shivam Bhatnagar's Submisson",
  description:
    "Football manager is a Next.js Web App built by Shivam Bhatnagar for a Hiring Challenge.",
  keywords: [
    "hiring challenge",
    "hiring",
    "shivam bhatnagar",
    "Shivam Bhatnagar",
    "SHIVAM BHATNAGAR",
    "bitnagar",
    "Bitnagar",
    "shivam",
    "vercel",
    "Next.js",
    "react",
    "nextjs",
    "NEXT.JS",
  ],
  authors: [{ name: "Shivam Bhatnagar", url: "https://www.bitnagar.dev" }],
  creator: "Shivam Bhatnagar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="w-full h-full"
    >
      <body
        className={poppins.className + " overflow-hidden flex w-full h-full"}
      >
        <ReduxProvider>
          <Sidebar />
          <main className=" w-full overflow-hidden p-10">{children}</main>
        </ReduxProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
