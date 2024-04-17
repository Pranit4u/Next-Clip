import { createContext, Dispatch, SetStateAction } from 'react';
import { TooltipObjectInterface } from './lib/utils/definition';

interface ISearchContext {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  showLabelMenu: boolean;
  setShowLabelMenu: Dispatch<SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  tooltipObject: TooltipObjectInterface;
  setTooltipObject: Dispatch<SetStateAction<TooltipObjectInterface>>;
}

export const SearchContext = createContext<ISearchContext>({searchQuery: '', setSearchQuery: () => {}, showLabelMenu: false, setShowLabelMenu: () => {}, darkMode: false, setDarkMode: () => {}, tooltipObject: {search: false, text: false, labelOption: false, setting: false, refresh: false, clips: false, labelInput: false, clipInput: false, maskInput: false} as TooltipObjectInterface, setTooltipObject: () => {}});