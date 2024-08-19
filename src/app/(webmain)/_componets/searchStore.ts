import { create } from 'zustand';

interface SearchState {
  isbg: boolean;
  inputValue: string;
  storgeData: string[];
  setIsbg: (value: boolean) => void;
  setInputValue: (value: string) => void;
  addToStorage: () => void;
  removeFromStorage: (value: string) => void;
  initializeStorage: () => void;
}

export const useSearchStore = create<SearchState>((set, get) => {
  return {
    isbg: false,
    inputValue: '',
    storgeData: [],
    setIsbg: (value: boolean) => set({ isbg: value }),
    setInputValue: (value) => set({ inputValue: value }),
    addToStorage: () => {
      const { inputValue, storgeData } = get();
      const updatedStorage = [...storgeData, inputValue];
      set({ storgeData: updatedStorage });
      localStorage.setItem('search', updatedStorage.join(','));
    },
    removeFromStorage: (value) => {
      set((state) => {
        const filteredStorage = state.storgeData.filter(
          (item) => item !== value,
        );
        localStorage.setItem('search', filteredStorage.join(','));
        return { storgeData: filteredStorage };
      });
    },
    initializeStorage: () => {
      const data = localStorage.getItem('search');
      set({ storgeData: data ? data.split(',') : [] });
    },
  };
});
