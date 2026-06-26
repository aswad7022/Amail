import type { Conversation } from "../models/conversation";
import type { Mail } from "../models/mail";

export function buildConversation(
  messages: Mail[]
): Conversation {
  const last = messages[messages.length - 1];

  return {
    id: crypto.randomUUID(),

    subject: last.subject,

    sender: last.sender,

    senderEmail: last.senderEmail,

    preview: last.preview,

    time: last.time,

    unread: last.unread,

    starred: last.starred,

    hasAttachment: last.hasAttachment,

    category: "primary",

    messages,
  };
}