import type { Account } from "../models/account";

import type { Mail } from "../models/mail";



import { generateOutgoingMails } from "./outgoingGenerator";

import { randomScenario } from "./scenarioGenerator";



import { buildUnderReviewReply } from "../data/templates/replies/underReview";

import { buildFollowUpReply } from "../data/templates/replies/followUp";

import { buildFinalFollowUp } from "../data/templates/replies/finalFollowUp";



function formatTime(date: Date) {

  return date.toLocaleTimeString("en-US", {

    hour: "2-digit",

    minute: "2-digit",

    hour12: true,

  });

}



function moneygramReply(

  account: Account,

  body: string,

  date: Date,

  preview: string

): Mail {

  return {

    id: crypto.randomUUID(),



    subject:

      "Request for Refund Status and Transaction Inquiry",



    body,



    from: "customerservice@moneygram.com",



    to: account.email,



    sender: "MoneyGram Customer Service",



    senderEmail:

      "customerservice@moneygram.com",



    preview,



    time: formatTime(date),



    unread: false,



    read: true,



    starred: false,



    hasAttachment: false,



    attachments: [],



    date,



    direction: "incoming",



    status: "received",

  };

}



export function generateTimeline(

  account: Account

): Mail[] {



  const outgoing =

    generateOutgoingMails(account);



  const first = outgoing.first;



  const follow = outgoing.follow;



  const final = outgoing.final;



  const reply1 = moneygramReply(

    account,

    buildUnderReviewReply(

      account.transaction.referenceNumber

    ),

    new Date(

      first.date.getTime() +

        1 * 24 * 60 * 60 * 1000

    ),

    "Your transaction is under review."

  );



  const reply2 = moneygramReply(

    account,

    buildFollowUpReply(

      account.transaction.referenceNumber

    ),

    new Date(

      follow.date.getTime() +

        1 * 24 * 60 * 60 * 1000

    ),

    "Review is still in progress."

  );



  const reply3 = moneygramReply(

    account,

    buildFinalFollowUp(

      account.transaction.referenceNumber

    ),

    new Date(

      final.date.getTime() +

        1 * 24 * 60 * 60 * 1000

    ),

    "Compliance review continues."

  );



  switch (randomScenario()) {

    case 1:

      return [first];



    case 2:

      return [first, reply1];



    case 3:

      return [

        first,

        reply1,

        follow,

      ];



    case 4:

      return [

        first,

        reply1,

        follow,

        reply2,

      ];



    case 5:

      return [

        first,

        reply1,

        follow,

        reply2,

        final,

      ];



    default:

      return [

        first,

        reply1,

        follow,

        reply2,

        final,

        reply3,

      ];

  }

} 

