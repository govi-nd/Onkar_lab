
import "./globals.css";
import NavBar from "@/components/navbar/navbar";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

import { Providers } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

// ...inside your layout JSX, before closing </body>


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
        <Toaster />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
