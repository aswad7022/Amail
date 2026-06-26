import type { Transaction } from "./transaction";
import type { Conversation } from "./conversation";
import type { Mail } from "./mail";

export interface Account {
  id: number;

  fullName: string;

  firstName: string;

  fatherName: string;

  grandfatherName: string;

  lastName: string;

  gender: "male" | "female";

  email: string;

  avatarLetter: string;

  avatarColor: string;

  transaction: Transaction;

  inbox: Conversation[];

  sent: Mail[];

  drafts: Mail[];

  spam: Mail[];

  trash: Mail[];
}