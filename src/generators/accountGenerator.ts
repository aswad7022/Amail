import type { Account } from "../models/account";

import { generatePerson } from "./iraqiNames";
import { generateEmail } from "./emailGenerator";

const avatarColors = [
  "#1A73E8",
  "#188038",
  "#D93025",
  "#9334E6",
  "#E37400",
  "#00897B",
  "#5E35B1",
  "#3949AB",
  "#C2185B",
  "#546E7A",
];

function randomColor() {
  return avatarColors[
    Math.floor(Math.random() * avatarColors.length)
  ];
}

export function generateAccounts(
  count: number
): Account[] {
  const accounts: Account[] = [];

  for (let i = 1; i <= count; i++) {
    const person = generatePerson();

    const email = generateEmail(
      person.firstName,
      person.fatherName
    );

    accounts.push({
      id: i,

      fullName: person.fullName,

      firstName: person.firstName,

      fatherName: person.fatherName,

      grandfatherName: person.grandfatherName,

      lastName: person.lastName,

      gender: person.gender,

      email,

      avatarLetter: person.firstName
        .charAt(0)
        .toUpperCase(),

      avatarColor: randomColor(),

      transaction: {
        referenceNumber: "",
        transactionDate: "",
        transactionType: "Cash Pickup",

        senderName: person.fullName,
        senderEmail: email,
        receiverName: "",

        status: "Under Review",

        suspendedAt: "",
      },

      inbox: [],
      sent: [],
      drafts: [],
      spam: [],
      trash: [],
    });
  }

  return accounts;
}