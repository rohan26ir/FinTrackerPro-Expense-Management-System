import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/navbar";
import Footer from "./components/shared/footer";
import { ThemeProvider } from "./components/theme-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinTrackerPro – Smart Daily Expense & Income Management System",
  description: "Track your income, monitor spending, and manage your financial life with powerful insights and analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >

          <header>
            <Navbar></Navbar>
          </header>

          <main className="min-h-screen">
            {children}
          </main>

          <footer>
            <Footer></Footer>
          </footer>

        </ThemeProvider>


      </body>
    </html>
  );
}
