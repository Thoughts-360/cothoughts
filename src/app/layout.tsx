import { Montserrat, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });


export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="en" className={`${montserrat.variable} ${geistMono.variable}`}>
                  <body
                        className="antialiased"
                        suppressHydrationWarning={true}
                  >
                        <div className="flex flex-col min-h-screen">
                              <main className="flex-1 mx-auto w-full" id="main-content">{children}</main>
                        </div>
                  </body>
            </html>
      );
}
