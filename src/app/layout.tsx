import type { Metadata } from "next";
import { Poppins } from '@next/font/google';
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import Navbar from "@/components/Navbar/Navbar";
import NextUIProviderWrapper from "@/providers/NextUIProvider";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

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
          <Navbar />
          <div className="mt-[56px] min-h-screen w-full xl:max-w-[2048px] px-[1%] py-4 lg:px-[2.5%] mx-auto">
            <ReduxProvider>
              {children}
            </ReduxProvider>
          </div>
          <Footer />
          <Toaster
            position="top-right"
            reverseOrder={false} />
        </NextUIProviderWrapper>
      </body>
    </html>
  );
}
