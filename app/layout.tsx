/** @format */

import ReactQueryProvider from "./utils/reactQueryProvider";
import Nav from "./components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import Recoil from "./utils/Recoil";
import Head from "./head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "포켓몬 도감",
  description: "나만의 포켓몬 도감!!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body className={inter.className}>
        <Recoil>
          <ReactQueryProvider>
            <Nav />
            {children}
          </ReactQueryProvider>
        </Recoil>
      </body>
    </html>
  );
}
