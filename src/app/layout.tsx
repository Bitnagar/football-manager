import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import ReduxProvider from "@/components/redux/ReduxProvider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        <Toaster />
      </body>
    </html>
  );
}
