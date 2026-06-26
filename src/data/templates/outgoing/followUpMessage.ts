export function buildFollowUpMessage(
  sender: string,
  reference: string
) {
  return `Dear MoneyGram Customer Service,

I would like to follow up regarding my previous inquiry about the following transaction.

Reference Number: ${reference}

Could you please provide any update regarding the current review status?

Thank you for your assistance.

Kind regards,

${sender}`;
}