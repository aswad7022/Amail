export interface Mail {
  id: string;

  sender: string;
  senderEmail: string;

  from: string;
  to: string;

  subject: string;

  preview: string;

  body: string;

  time: string;

  date: Date;

  unread: boolean;
  read: boolean;

  starred: boolean;

  hasAttachment: boolean;

  attachments: string[];

  folder: "inbox" | "sent" | "drafts" | "spam" | "trash";

  labels: string[];
}