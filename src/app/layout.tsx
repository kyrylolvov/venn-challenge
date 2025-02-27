import "~/styles/globals.css";

import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const sansFont = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Venn Challenge",
  description: "Completed by Kyrylo Lvov",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sansFont.variable} grid h-screen w-screen place-items-center p-4 antialiased`}>{children}</body>
    </html>
  );
}
