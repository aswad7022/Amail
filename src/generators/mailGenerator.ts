import type { Account } from "../models/account";
import type { Mail } from "../models/mail";

import {
  FIRST_MESSAGE_SUBJECT,
  FIRST_MESSAGE_TO,
  buildFirstMessage,
} from "../data/templates/outgoing/firstMessage";

export function generateSentMail(
  account: Account
): Mail {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,

    subject: FIRST_MESSAGE_SUBJECT,

    body: buildFirstMessage(
      account.fullName,
      account.transaction.receiverName,
      account.transaction.referenceNumber
    ),

    from: account.email,

    to: FIRST_MESSAGE_TO,

    sender: account.fullName,

    senderEmail: account.email,

    preview:
      "I would like to inquire about the status of my transaction.",

    time: "10:00 PM",

    unread: false,

    read: true,

    starred: false,

    hasAttachment: false,

    attachments: [],

    date: new Date("2026-02-23T22:00:00"),

    direction: "outgoing",

    status: "sent",
  };
}