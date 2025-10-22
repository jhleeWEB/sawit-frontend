import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import Providers from "../(providers)/providers";
import TopNavigation from "./_components/top-navigation/top-navigation";
// import SideMenu from "./_components/side-menu/side-menu";

const SITE_TITLE = "SawIt - 우리만의 공간, 남 눈치 없는 커뮤니티, 소통의 장소";
const SITE_DESCRIPTION =
  "우리들만의 공간, 눈치 안 보고 취향을 마음껏 펼치는 커뮤니티.";
const SITE_NAME = "SawIt";
const SITE_URL = "https://sawit-frontend.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · Sawit",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,

    creator: "@jhlee89898989",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
            {/* <aside className="left-menu-container">
              <SideMenu />
            </aside> */}
            <div className="subgrid-container">{children}</div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
