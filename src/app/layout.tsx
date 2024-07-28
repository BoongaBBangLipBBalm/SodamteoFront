import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@components/nav/nav";
import LayoutStyle from "@/styles/layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoDamTeoㅣ 소담터",
  description: "아름답고 정성스러운 농작물 관리 스마트 터전",
  icons: {
		icon: "/img/favicon.svg",
	},
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
          <div className={LayoutStyle.layoutWrapper}>
            <Nav></Nav>
            {children}
          </div>
      </body>
    </html>
  );
}
