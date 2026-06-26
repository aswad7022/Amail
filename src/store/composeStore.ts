import { create } from "zustand";

interface ComposeStore {
  open: boolean;

  openCompose: () => void;

  closeCompose: () => void;
}

export const useComposeStore = create<ComposeStore>((set) => ({
  open: false,

  openCompose: () =>
    set({
      open: true,
    }),

  closeCompose: () =>
    set({
      open: false,
    }),
}));