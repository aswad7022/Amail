import type { Mail } from "../models/mail";
import type { Account } from "../models/account";

const replies = [
`Dear Customer,

Thank you for contacting MoneyGram.

Your transaction is still under review by our Compliance Department.

No further action is required from your side.

Kind regards,

MoneyGram Customer Service`,

`Dear Customer,

Your refund request has been received.

The review is still ongoing.

We appreciate your patience while our team completes the investigation.

MoneyGram Customer Service`,

`Dear Customer,

Our Compliance Team is currently reviewing your transaction.

We will notify you immediately once the review has been completed.

Thank you.

MoneyGram Customer Service`,
];

function randomHours() {
  return Math.floor(Math.random() * 72) + 12;
}

export function generateAutoReply(
  account: Account,
  subject: string,
  previousDate: Date
): Mail {

  const date = new Date(
    previousDate.getTime() +
      randomHours() *
        60 *
        60 *
        1000
  );

  const body =
    replies[
      Math.floor(
        Math.random() * replies.length
      )
    ];

  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,

    subject,

    body,

    from:
      "customerservice@moneygram.com",

    to: account.email,

    sender:
      "MoneyGram Customer Service",

    senderEmail:
      "customerservice@moneygram.com",

    preview: body.substring(0, 80),

    time: date.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    ),

    unread: true,

    read: false,

    starred: false,

    hasAttachment: false,

    attachments: [],

    date,

    direction: "incoming",

    status: "received",
  };
}