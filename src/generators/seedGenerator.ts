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

    // توليد مصفوفة الـ inbox أولاً
    account.inbox = [
      buildConversation(timeline),

      ...generateRandomInbox(account.email).map((mail) =>
        buildConversation([mail])
      ),
    ];

    // تطبيق خوارزمية Fisher–Yates Shuffle لترتيب عشوائي مثالي
    for (let i = account.inbox.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [
        account.inbox[i],
        account.inbox[j],
      ] = [
        account.inbox[j],
        account.inbox[i],
      ];
    }

    account.drafts = [];
    account.spam = [];
    account.trash = [];

    return account;
  });
}