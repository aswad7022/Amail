const usedReferenceNumbers = new Set<string>();

function randomDigit(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export interface Transaction {
  referenceNumber: string;

  transactionDate: string;

  transactionType: "Cash Pickup";

  senderName: string;

  senderEmail: string;

  receiverName: string;

  status: "Under Review" | "Refund Pending" | "Completed";

  suspendedAt: string;
}

export function generateTransaction(
  senderName: string,
  senderEmail: string,
  receiverName: string
): Transaction {
  while (true) {
    const referenceNumber = String(
      randomDigit(10000000, 99999999)
    );

    if (usedReferenceNumbers.has(referenceNumber)) {
      continue;
    }

    usedReferenceNumbers.add(referenceNumber);

    return {
      referenceNumber,

      transactionDate: "18/02/2026",

      transactionType: "Cash Pickup",

      senderName,

      senderEmail,

      receiverName,

      status: "Under Review",

      suspendedAt: "18/02/2026",
    };
  }
}