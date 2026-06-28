import type { Conversation } from "../models/conversation";
import type { Mail } from "../models/mail";

export function buildConversation(
  messages: Mail[]
): Conversation {
  const last = messages[messages.length - 1];

  // تعريف قائمة الشركات لتمييز نوع المرسل بشكل تلقائي واحترافي
  const companies = [
    "MoneyGram Customer Service",
    "Spotify",
    "Google Photos",
    "Apple",
    "PayPal",
    "Amazon",
    "Google Drive",
    "Netflix",
    "Discord",
    "Microsoft",
  ];

  return {
    id: Math.random().toString(36).slice(2) + Date.now(),

    subject: last.subject,

    sender: last.sender,

    senderEmail: last.senderEmail,

    // التحقق من نوع المرسل وتعيينه بناءً على القائمة أعلاه
    senderType: companies.includes(last.sender)
      ? "company"
      : "person",

    preview: last.preview,

    time: last.time,

    unread: last.unread,

    starred: last.starred,

    hasAttachment: last.hasAttachment,

    category: "primary",

    messages,
  };
}