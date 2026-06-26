import { create } from "zustand";

interface ComposeStore {
  open: boolean;

  to: string;

  subject: string;

  body: string;

  openCompose: () => void;

  closeCompose: () => void;

  setTo: (value: string) => void;

  setSubject: (value: string) => void;

  setBody: (value: string) => void;

  clear: () => void;
}

export const useComposeStore =
  create<ComposeStore>((set) => ({
    open: false,

    to: "",

    subject: "",

    body: "",

    openCompose: () =>
      set({
        open: true,
      }),

    closeCompose: () =>
      set({
        open: false,
      }),

    setTo: (value) =>
      set({
        to: value,
      }),

    setSubject: (value) =>
      set({
        subject: value,
      }),

    setBody: (value) =>
      set({
        body: value,
      }),

    clear: () =>
      set({
        to: "",
        subject: "",
        body: "",
        open: false,
      }),
  }));