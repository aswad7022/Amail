export function buildUnderReviewReply(
  reference: string
) {
  return `Dear Customer,

Thank you for contacting MoneyGram Customer Service.

Your transaction (${reference}) has been placed under review due to an AML Red Flag generated during our compliance screening.

Our Compliance Team is currently reviewing the transaction.

At this time no additional action is required from you.

If further documentation becomes necessary, we will contact you by email.

We appreciate your patience.

Kind regards,

MoneyGram Customer Service`;
}