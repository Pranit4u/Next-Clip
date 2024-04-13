'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/Header";
import StoreProvider from "./StoreProvider";
import { useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showLabelMenu, setShowLabelMenu] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setDarkMode(true);
    }
  }, []);  

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <StoreProvider>
        <body className={inter.className + ' h-screen'}>
          <div className="w-80 bg-white dark:bg-slate-900 flex flex-col">
            <SearchContext.Provider value={{searchQuery, setSearchQuery, showLabelMenu, setShowLabelMenu, darkMode, setDarkMode}}>
              <Header />
              {children}
            </SearchContext.Provider>
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}
