import type { Mail } from "../models/mail";

export function generateTikTokMail(email: string): Mail {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,

    sender: "TikTok",
    senderEmail: "security@tiktok.com",

    from: "security@tiktok.com",
    to: email,

    subject: "New login detected",

    preview: "Your TikTok account was accessed.",

    body: `We detected a new login to your TikTok account.

If this was you, no action is required.

TikTok Security Team`,

    time: "3:18 PM",

    date: new Date("2026-02-21T15:18:00"),

    unread: true,
    read: false,

    starred: false,
    hasAttachment: false,
    attachments: [],

    direction: "incoming",
    status: "received",
  };
}