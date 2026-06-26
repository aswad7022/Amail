import type { Account } from "../models/account";
import type { Mail } from "../models/mail";

import {
  FIRST_MESSAGE_SUBJECT,
  FIRST_MESSAGE_TO,
  buildFirstMessage,
} from "../data/templates/outgoing/firstMessage";

import { buildFollowUpMessage } from "../data/templates/outgoing/followUpMessage";
import { buildFinalFollowUpMessage } from "../data/templates/outgoing/finalFollowUpMessage";

import {
  randomBetween,
  addDays,
} from "./dateGenerator";

function createDates() {
  const first = randomBetween(
    new Date("2026-02-20T08:00:00"),
    new Date("2026-02-28T22:00:00")
  );

  const follow = addDays(first, 5, 25);

  const final = addDays(follow, 20, 120);

  return {
    first,
    follow,
    final,
  };
}

function buildMail(
  account: Account,
  body: string,
  date: Date
): Mail {
  return {
    id: crypto.randomUUID(),

    subject: FIRST_MESSAGE_SUBJECT,

    body,

    from: account.email,

    to: FIRST_MESSAGE_TO,

    sender: account.fullName,

    senderEmail: account.email,

    preview: body.replace(/\n/g, " ").slice(0, 80),

    time: date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),

    unread: false,

    read: true,

    starred: false,

    hasAttachment: false,

    attachments: [],

    date,

    direction: "outgoing",

    status: "sent",
  };
}

export function generateOutgoingMails(
  account: Account
) {
  const dates = createDates();

  return {
    first: buildMail(
      account,
      buildFirstMessage(
        account.fullName,
        account.transaction.receiverName,
        account.transaction.referenceNumber
      ),
      dates.first
    ),

    follow: buildMail(
      account,
      buildFollowUpMessage(
        account.fullName,
        account.transaction.referenceNumber
      ),
      dates.follow
    ),

    final: buildMail(
      account,
      buildFinalFollowUpMessage(
        account.fullName,
        account.transaction.referenceNumber
      ),
      dates.final
    ),
  };
}