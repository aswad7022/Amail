import type { Mail } from "../models/mail";

const senders = [
  {
    name: "Google Security",
    email: "no-reply@accounts.google.com",
    subjects: [
      "Security alert",
      "Password changed",
      "New sign-in detected",
    ],
  },
  {
    name: "Amazon",
    email: "shipment@amazon.com",
    subjects: [
      "Your order has shipped",
      "Package delivered",
      "Delivery update",
    ],
  },
  {
    name: "TikTok",
    email: "security@tiktok.com",
    subjects: [
      "New login detected",
      "Account notification",
      "Security notice",
    ],
  },
  {
    name: "Facebook",
    email: "security@facebookmail.com",
    subjects: [
      "Login alert",
      "Security check",
      "New device connected",
    ],
  },
  {
    name: "Instagram",
    email: "security@mail.instagram.com",
    subjects: [
      "New login",
      "Password reset",
      "Security notification",
    ],
  },
  {
    name: "Microsoft",
    email: "account-security-noreply@account.microsoft.com",
    subjects: [
      "Security alert",
      "Password updated",
      "New sign in",
    ],
  },
  {
    name: "Apple",
    email: "appleid@id.apple.com",
    subjects: [
      "Apple ID notification",
      "New device",
      "Security update",
    ],
  },
  {
    name: "PayPal",
    email: "service@paypal.com",
    subjects: [
      "Payment received",
      "Security notice",
      "Account update",
    ],
  },
  {
    name: "LinkedIn",
    email: "messages-noreply@linkedin.com",
    subjects: [
      "New connection",
      "Job recommendation",
      "Profile viewed",
    ],
  },
  {
    name: "Discord",
    email: "noreply@discord.com",
    subjects: [
      "Login detected",
      "Security notice",
      "New device",
    ],
  },
  {
    name: "Netflix",
    email: "info@netflix.com",
    subjects: [
      "New sign in",
      "Subscription updated",
      "Payment reminder",
    ],
  },
  {
    name: "Binance",
    email: "do-not-reply@binance.com",
    subjects: [
      "Withdrawal confirmation",
      "Security verification",
      "New login",
    ],
  },
  {
    name: "GitHub",
    email: "noreply@github.com",
    subjects: [
      "New sign in",
      "Repository invitation",
      "Security alert",
    ],
  },
  {
    name: "Dropbox",
    email: "no-reply@dropbox.com",
    subjects: [
      "New login",
      "File shared with you",
      "Storage update",
    ],
  },
  {
    name: "Zoom",
    email: "no-reply@zoom.us",
    subjects: [
      "Meeting reminder",
      "Meeting invitation",
      "Account security",
    ],
  },
  {
    name: "Steam",
    email: "noreply@steampowered.com",
    subjects: [
      "Steam Guard",
      "New login",
      "Purchase receipt",
    ],
  },
];

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

export function generateRandomInbox(
  email: string
): Mail[] {
  const shuffled = [...senders].sort(
    () => Math.random() - 0.5
  );

  const count = random(3, 7);

  return shuffled.slice(0, count).map((company) => {
    const subject =
      company.subjects[
        random(0, company.subjects.length - 1)
      ];

    return {
      id: crypto.randomUUID(),

      sender: company.name,
      senderEmail: company.email,

      from: company.email,
      to: email,

      subject,

      preview: subject,

      body: `${subject}

This is an automatically generated email.`,

      time: randomTime(),

      date: new Date(),

      unread: Math.random() > 0.5,

      read: Math.random() > 0.5,

      starred: Math.random() > 0.8,

      hasAttachment: Math.random() > 0.75,

      attachments: Math.random() > 0.75 ? ["document.pdf"] : [],
    };
  });
}