"use client";
import Sidebar from "@/components/Sidebar";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import ToastProvider from "@/components/ToastProvider";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token && pathname !== "/login") {
      router.push("/login");
    } else {
      setAuthenticated(true);
    }
    setChecking(false);
  }, [pathname]);

  if (checking) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
          </div>
        </body>
      </html>
    );
  }

  // Render login page without Navbar/Sidebar
  if (pathname === "/login") {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ToastProvider />
          {children}
        </body>
      </html>
    );
  }

  if (!authenticated) return null;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div>
          <ToastProvider />
          <Navbar />
          <hr />
          <div className="app-content flex">
            <Sidebar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}