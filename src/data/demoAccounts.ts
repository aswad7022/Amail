import type { Account } from "../models/account";

export const demoAccounts: Account[] = [
  {
    id: 1,
    fullName: "Ahmed Yaseen Taha Al-Dori",
    firstName: "Ahmed",
    fatherName: "Yaseen",
    grandfatherName: "Taha",
    lastName: "Al-Dori",
    gender: "male",
    email: "ahmed839ta@gmail.com",
    avatarLetter: "A",
    avatarColor: "#1A73E8",

    transaction: {
      referenceNumber: "74913825",
      transactionDate: "18/02/2026",
      transactionType: "Cash Pickup",

      senderName: "Ahmed Yaseen Taha Al-Dori",
      senderEmail: "ahmed839ta@gmail.com",
      receiverName: "Noor Abbas Khadim Al-Allami",

      status: "Under Review",

      suspendedAt: "18/02/2026",
    },

    inbox: [],
    sent: [],
    drafts: [],
    spam: [],
    trash: [],
  },

  {
    id: 2,
    fullName: "Noor Abbas Khadim Al-Allami",
    firstName: "Noor",
    fatherName: "Abbas",
    grandfatherName: "Khadim",
    lastName: "Al-Allami",
    gender: "female",
    email: "noor847@gmail.com",
    avatarLetter: "N",
    avatarColor: "#D93025",

    transaction: {
      referenceNumber: "84261753",
      transactionDate: "18/02/2026",
      transactionType: "Cash Pickup",

      senderName: "Noor Abbas Khadim Al-Allami",
      senderEmail: "noor847@gmail.com",
      receiverName: "Ahmed Yaseen Taha Al-Dori",

      status: "Under Review",

      suspendedAt: "18/02/2026",
    },

    inbox: [],
    sent: [],
    drafts: [],
    spam: [],
    trash: [],
  },
];