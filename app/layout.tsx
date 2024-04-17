'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/Header";
import StoreProvider from "./StoreProvider";
import { useEffect, useState } from "react";
import { SearchContext } from "./SearchContext";
import { TooltipObjectInterface } from "./lib/utils/definition";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showLabelMenu, setShowLabelMenu] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [tooltipObject, setTooltipObject] = useState<TooltipObjectInterface>({
    search: false,
    labelOption: false,
    setting: false,
    refresh: false,
    clips: false,
    labelInput: false,
    clipInput: true,
    maskInput: false,
  });

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const tooltipShown = localStorage.getItem('tooltipShown');
    if (storedDarkMode) {
      setDarkMode(true);
    }
    if (tooltipShown) {
      setTooltipObject(prev => ({ ...prev, clipInput: false }));
    }
  }, []);

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <StoreProvider>
        <body className={inter.className + ' h-screen'}>
          <div className="w-80 bg-white dark:bg-slate-900 flex flex-col">
            <SearchContext.Provider value={{ searchQuery, setSearchQuery, showLabelMenu, setShowLabelMenu, darkMode, setDarkMode, tooltipObject, setTooltipObject }}>
              <Header />
              {children}
            </SearchContext.Provider>
          </div>
        </body>
      </StoreProvider>
    </html>
  );
}
