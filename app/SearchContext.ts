import { createContext, Dispatch, SetStateAction } from 'react';

interface ISearchContext {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  showLabelMenu: boolean;
  setShowLabelMenu: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
}

export const SearchContext = createContext<ISearchContext>({searchQuery: '', setSearchQuery: () => {}, showLabelMenu: false, setShowLabelMenu: () => {}, darkMode: false, setDarkMode: () => {}});