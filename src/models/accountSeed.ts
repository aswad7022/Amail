import type { Account } from "./account";
import type { Transaction } from "./transaction";
import type { Mail } from "./mail";

export interface AccountSeed {
  account: Account;

  transaction: Transaction;

  inbox: Mail[];

  sent: Mail[];

  drafts: Mail[];

  spam: Mail[];

  trash: Mail[];
}