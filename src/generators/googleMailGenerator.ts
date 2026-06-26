import type { Mail } from "../models/mail";

export function generateGoogleMail(email: string): Mail {
  return {
    id: crypto.randomUUID(),

    sender: "Google Security",
    senderEmail: "no-reply@accounts.google.com",

    from: "no-reply@accounts.google.com",
    to: email,

    subject: "Security alert",

    preview: "New sign-in detected.",

    body: `A new sign-in to your Google Account was detected.

If this was you, no further action is required.

Google Accounts Team`,

    time: "8:41 AM",

    date: new Date("2026-02-20T08:41:00"),

    unread: false,

    read: true,

    starred: false,

    hasAttachment: false,

    attachments: [],
  };
}