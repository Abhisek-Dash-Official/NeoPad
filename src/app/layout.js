import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NeoPad",
  description: "NeoPad is a single-page web application that recreates the classic keypad mobile phone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex items-center justify-center h-screen`}
      >
        <main className="w-full h-full flex items-center justify-center bg-gray-700">
          {children}
        </main>
      </body>
    </html>
  );
}
