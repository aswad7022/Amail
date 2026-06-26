import type { Mail } from "./mail";

export type ConversationCategory =
  | "primary"
  | "social"
  | "promotions"
  | "updates";

export interface Conversation {
  id: string;

  subject: string;

  sender: string;

  senderEmail: string;

  // الإضافة الجديدة هنا: تحديد نوع المرسل
  senderType:
    | "company"
    | "person";

  preview: string;

  time: string;

  unread: boolean;

  starred: boolean;

  hasAttachment: boolean;

  category: ConversationCategory;

  messages: Mail[];
}