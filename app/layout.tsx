import { CartProvider } from "@/components/cartContext";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <CartProvider>
        <NavBar />
        {children}
        <Footer/>
        </CartProvider>
      </body>
    </html>
  );
}
