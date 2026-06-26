import { create } from "zustand";

import type { Account } from "../models/account";
import type { Mail } from "../models/mail";

interface AccountStore {
  accounts: Account[];

  currentAccount: Account | null;

  setAccounts: (
    accounts: Account[]
  ) => void;

  setCurrentAccount: (
    account: Account
  ) => void;

  addSentMail: (
    mail: Mail
  ) => void;
}

export const useAccountStore =
  create<AccountStore>((set, get) => ({
    accounts: [],

    currentAccount: null,

    setAccounts: (accounts) =>
      set({
        accounts,
        currentAccount:
          accounts[0] ?? null,
      }),

    setCurrentAccount: (
      account
    ) =>
      set({
        currentAccount: account,
      }),

    addSentMail: (
      mail
    ) => {
      const current =
        get().currentAccount;

      if (!current) return;

      const updated: Account = {
        ...current,

        sent: [
          mail,
          ...current.sent,
        ],
      };

      set({
        currentAccount: updated,

        accounts:
          get().accounts.map((a) =>
            a.id === updated.id
              ? updated
              : a
          ),
      });
    },
  }));