export interface Mail {
  id: string;

  subject: string;

  body: string;

  from: string;

  to: string;

  sender: string;

  senderEmail: string;

  preview: string;

  time: string;

  unread: boolean;

  read: boolean;

  starred: boolean;

  hasAttachment: boolean;

  attachments: string[];

  date: Date;
}