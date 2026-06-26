export function buildFinalFollowUpMessage(
  sender: string,
  reference: string
) {
  return `Dear MoneyGram Customer Service,

I am contacting you again regarding transaction ${reference}.

Several months have passed since my original inquiry and I have not yet received a final resolution.

I would appreciate any update regarding the refund process.

Thank you for your continued support.

Best regards,

${sender}`;
}