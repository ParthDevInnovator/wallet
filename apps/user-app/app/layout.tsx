import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { AppBarClient } from "../components/AppBarClient";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "V Wallet ",
  description: "Wallet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className=" bg-[#ebe6e6]">
            <AppBarClient />
          </div>
          {children}
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
