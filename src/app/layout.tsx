import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import { StoreProvider } from "@/store/StoreProvider";
import { ReactNode } from "react";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "Jiblii Salaa",
  description: "This is the home page of the Jiblii Salaa web application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${poppins.className} bg-gray-50`}>
          <Header />
          <div className="min-h-screen w-full flex flex-col justify-between">
            <div className="mt-20">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
