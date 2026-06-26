import type { Account } from "../models/account";

let accounts: Account[] = [];

export function getAccounts() {
  return accounts;
}

export function setAccounts(data: Account[]) {
  accounts = data;
}

export function getAccount(id: number) {
  return accounts.find((a) => a.id === id);
}