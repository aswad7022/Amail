export const FIRST_MESSAGE_SUBJECT =
  "Request for Refund Status and Transaction Inquiry";

export const FIRST_MESSAGE_TO =
  "customerservice@moneygram.com";

export function buildFirstMessage(
  sender: string,
  receiver: string,
  reference: string
) {
  return `Dear MoneyGram Customer Service,

I hope you are doing well.

I would like to inquire about the status of the following transaction and request information regarding the refund process.

Reference Number: ${reference}

Sender Name: ${sender}

Receiver Name: ${receiver}

Transaction Date: 18/02/2026

Transaction Type: Cash Pickup

According to the application, the payment was not received by the beneficiary and the transaction appears to be suspended.

Please confirm the refund status and advise when the funds will be available.

Thank you for your support.

Best regards,

${sender}`;
}