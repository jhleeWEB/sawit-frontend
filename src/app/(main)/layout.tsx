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
      <body>
        <Providers>
          <TopNavigation />
          <div className="grid-container">
            <aside className="left-menu-container">
              <SideMenu />
            </aside>
            <div className="main-container">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
