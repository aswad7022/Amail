export interface Transaction {
  referenceNumber: string;
  transactionDate: string;
  transactionType: "Cash Pickup";

  senderName: string;
  senderEmail: string;

  receiverName: string;

  status:
    | "Under Review"
    | "Refund Pending"
    | "Completed";

  suspendedAt: string;
}