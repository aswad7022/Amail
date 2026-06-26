import type { Mail } from "../models/mail";
import { companies } from "../data/companyData";

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTime() {
  return `${random(1, 12)}:${String(
    random(0, 59)
  ).padStart(2, "0")} ${
    Math.random() > 0.5 ? "AM" : "PM"
  }`;
}

const attachments = [
  "invoice.pdf",
  "receipt.pdf",
  "statement.pdf",
  "photo.jpg",
  "document.docx",
  "report.xlsx",
  "archive.zip",
];

export function generateRandomInbox(
  email: string
): Mail[] {
  const shuffled = [...companies].sort(
    () => Math.random() - 0.5
  );

  return shuffled
    .slice(0, random(5, 12))
    .map((company) => {
      const subject =
        company.subjects[
          random(0, company.subjects.length - 1)
        ];

      const attachment =
        attachments[
          random(0, attachments.length - 1)
        ];

      const hasAttachment =
        Math.random() > 0.75;

      return {
        id: crypto.randomUUID(),

        sender: company.name,

        senderEmail: company.email,

        from: company.email,

        to: email,

        subject,

        preview: subject,

        body: `${subject}

This email was automatically generated for the AMail demo.

Thank you for using ${company.name}.`,

        time: randomTime(),

        date: new Date(
          Date.now() -
            random(1, 180) *
              24 *
              60 *
              60 *
              1000
        ),

        unread: Math.random() > 0.5,

        read: Math.random() > 0.5,

        starred: Math.random() > 0.8,

        hasAttachment,

        attachments: hasAttachment
          ? [attachment]
          : [],

        direction: "incoming",

        status: "received",
      };
    });
}