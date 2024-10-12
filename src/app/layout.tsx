import type { Metadata } from "next";
import { Poppins } from '@next/font/google';
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/Navbar/Navbar";
import NextUIProviderWrapper from "@/providers/NextUIProvider";

const poppins = Poppins({
  weight: ['400', '600', '700'], // Select the weights you need
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Pixel Tech",
  description: "Online Tech Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`bg-slate-50 text-gray-800 dark:bg-gray-800 dark:text-slate-50 poppins.className`}
      >
        <NextUIProviderWrapper>
          <div className="min-h-screen w-full xl:max-w-[2048px] px-[2%] lg:px-[3%]">
            <Navbar />
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </div>
        </NextUIProviderWrapper>
      </body>
    </html>
  );
}
