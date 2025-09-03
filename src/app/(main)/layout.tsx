import { Metadata } from "next";

import "../globals.css";
import Providers from "../providers";
import TopNavigation from "./_components/top-navigation/top-navigation";
import SideMenu from "./_components/side-menu/side-menu";

export const metadata: Metadata = {
  title: "Sawit",
  description: "Have You seen it? Yes I Sawit!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto">
        <Providers>
          <TopNavigation />
          <main className="grid grid-cols-[270px_1fr]">
            <aside className="col-start-1 contain-layout fixed w-[270px] min-h-[calc(100dvh-64px)] border-r-1">
              <SideMenu />
            </aside>
            <div className="col-start-2">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
