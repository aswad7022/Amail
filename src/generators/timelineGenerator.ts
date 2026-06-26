import type { Account } from "../models/account";
import type { Mail } from "../models/mail";

import { generateSentMail } from "./mailGenerator";

import { buildUnderReviewReply } from "../data/templates/replies/underReview";
import { buildFollowUpReply } from "../data/templates/replies/followUp";
import { buildFinalFollowUp } from "../data/templates/replies/finalFollowUp";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function generateTimeline(
  account: Account
): Mail[] {
  const sent = generateSentMail(account);

  sent.date = new Date("2026-02-23T22:00:00");
  sent.time = formatTime(sent.date);

  const firstReplyDate = new Date("2026-02-24T11:20:00");

  const firstReply: Mail = {
    id: crypto.randomUUID(),
    subject: sent.subject,
    body: buildUnderReviewReply(
      account.transaction.referenceNumber
    ),
    from: "customerservice@moneygram.com",
    to: account.email,
    sender: "MoneyGram Customer Service",
    senderEmail: "customerservice@moneygram.com",
    preview: "Your transaction is under review.",
    time: formatTime(firstReplyDate),
    unread: false,
    read: true,
    starred: false,
    hasAttachment: false,
    attachments: [],
    date: firstReplyDate,
  };

  const secondReplyDate = new Date("2026-03-09T10:40:00");

  const secondReply: Mail = {
    id: crypto.randomUUID(),
    subject: sent.subject,
    body: buildFollowUpReply(
      account.transaction.referenceNumber
    ),
    from: "customerservice@moneygram.com",
    to: account.email,
    sender: "MoneyGram Customer Service",
    senderEmail: "customerservice@moneygram.com",
    preview: "Review is still in progress.",
    time: formatTime(secondReplyDate),
    unread: false,
    read: true,
    starred: false,
    hasAttachment: false,
    attachments: [],
    date: secondReplyDate,
  };

  const finalReplyDate = new Date("2026-06-19T11:25:00");

  const finalReply: Mail = {
    id: crypto.randomUUID(),
    subject: sent.subject,
    body: buildFinalFollowUp(
      account.transaction.referenceNumber
    ),
    from: "customerservice@moneygram.com",
    to: account.email,
    sender: "MoneyGram Customer Service",
    senderEmail: "customerservice@moneygram.com",
    preview: "Compliance review continues.",
    time: formatTime(finalReplyDate),
    unread: true,
    read: false,
    starred: false,
    hasAttachment: false,
    attachments: [],
    date: finalReplyDate,
  };

  return [sent, firstReply, secondReply, finalReply];
}