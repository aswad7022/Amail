import type { Account } from "../models/account";

import { generateAccounts } from "./accountGenerator";
import { generateReferenceNumber } from "./referenceGenerator";
import { generateReceiver } from "./receiverGenerator";
import { generateTimeline } from "./timelineGenerator";
import { generateRandomInbox } from "./randomInboxGenerator";
import { buildConversation } from "./conversationGenerator";

export function generateSeed(count: number): Account[] {
  const accounts = generateAccounts(count);

  return accounts.map((account) => {
    account.transaction = {
      referenceNumber: generateReferenceNumber(),
      transactionDate: "18/02/2026",
      transactionType: "Cash Pickup",

      senderName: account.fullName,
      senderEmail: account.email,

      receiverName: generateReceiver(),

      status: "Under Review",

      suspendedAt: "18/02/2026",
    };

    const timeline = generateTimeline(account);

    account.sent = [timeline[0]];

    account.inbox = [
      buildConversation(timeline),

      ...generateRandomInbox(account.email).map((mail) =>
        buildConversation([mail])
      ),
    ];

    account.drafts = [];
    account.spam = [];
    account.trash = [];

    return account;
  });
}