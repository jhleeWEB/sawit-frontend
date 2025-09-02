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
          <main className="h-full w-full grid grid-cols-4 max-h-vdh max-w-dvw overflow-hidden">
            <aside className="col-start-1 col-span-1 border-r-1">
              <SideMenu />
            </aside>
            <section className="col-span-3 w-full h-[calc(100dvh-64px)] overflow-auto">
              <div className="w-full flex justify-center overflow-y-auto scrollbar-hide">
                {children}
              </div>
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
