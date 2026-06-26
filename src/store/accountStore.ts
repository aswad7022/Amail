import { create } from "zustand";
import type { Account } from "../models/account";

interface AccountStore {
  accounts: Account[];
  currentAccount: Account | null;

  setAccounts: (accounts: Account[]) => void;

  setCurrentAccount: (account: Account) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],

  currentAccount: null,

  setAccounts: (accounts) =>
    set({
      accounts,
      currentAccount: accounts.length ? accounts[0] : null,
    }),

  setCurrentAccount: (account) =>
    set({
      currentAccount: account,
    }),
}));