export interface Company {
  name: string;
  email: string;
  category:
    | "primary"
    | "social"
    | "promotions"
    | "updates";

  subjects: string[];
}

export const companies: Company[] = [
  {
    name: "Google Security",
    email: "no-reply@accounts.google.com",
    category: "updates",
    subjects: [
      "Security alert",
      "Password changed",
      "New sign-in detected",
      "Recovery information updated",
      "Your account was accessed",
    ],
  },
  {
    name: "Amazon",
    email: "shipment@amazon.com",
    category: "promotions",
    subjects: [
      "Your order has shipped",
      "Package delivered",
      "Delivery update",
      "Today's Deals",
      "Order confirmed",
    ],
  },
  {
    name: "Apple",
    email: "appleid@id.apple.com",
    category: "updates",
    subjects: [
      "Apple ID notification",
      "New device connected",
      "Payment receipt",
      "Subscription renewed",
      "Security update",
    ],
  },
  {
    name: "Microsoft",
    email: "account-security-noreply@account.microsoft.com",
    category: "updates",
    subjects: [
      "Security alert",
      "Password updated",
      "Microsoft account",
      "New sign in",
      "Recovery completed",
    ],
  },
  {
    name: "Google Drive",
    email: "drive-noreply@google.com",
    category: "updates",
    subjects: [
      "File shared with you",
      "Storage almost full",
      "Backup completed",
      "Drive activity",
      "New comment",
    ],
  },
  {
    name: "Google Photos",
    email: "photos-noreply@google.com",
    category: "updates",
    subjects: [
      "Your memories",
      "Backup complete",
      "New shared album",
      "Storage update",
      "Photo suggestions",
    ],
  },
  {
    name: "OpenAI",
    email: "noreply@openai.com",
    category: "updates",
    subjects: [
      "ChatGPT update",
      "API notice",
      "Usage summary",
      "Security notification",
      "New feature available",
    ],
  },
  {
    name: "Canva",
    email: "team@canva.com",
    category: "updates",
    subjects: [
      "Design shared",
      "Comment received",
      "Template available",
      "Project updated",
      "Export completed",
    ],
  },
  {
    name: "Adobe",
    email: "notifications@adobe.com",
    category: "updates",
    subjects: [
      "Creative Cloud update",
      "Invoice available",
      "Subscription renewed",
      "Storage usage",
      "New app released",
    ],
  },
  {
    name: "GitHub",
    email: "noreply@github.com",
    category: "updates",
    subjects: [
      "Repository invitation",
      "Pull request",
      "Security alert",
      "Dependabot",
      "Workflow completed",
    ],
  },
    {
    name: "TikTok",
    email: "security@tiktok.com",
    category: "social",
    subjects: [
      "New login detected",
      "Weekly summary",
      "Someone viewed your profile",
      "Security notice",
      "Account notification",
    ],
  },
  {
    name: "Facebook",
    email: "security@facebookmail.com",
    category: "social",
    subjects: [
      "New login",
      "Friend request",
      "New notifications",
      "Security check",
      "Page activity",
    ],
  },
  {
    name: "Instagram",
    email: "security@mail.instagram.com",
    category: "social",
    subjects: [
      "New follower",
      "New login",
      "Password reset",
      "Your reel is trending",
      "Security notification",
    ],
  },
  {
    name: "LinkedIn",
    email: "messages-noreply@linkedin.com",
    category: "social",
    subjects: [
      "Job recommendation",
      "New connection",
      "Profile viewed",
      "Message received",
      "Hiring update",
    ],
  },
  {
    name: "Discord",
    email: "noreply@discord.com",
    category: "social",
    subjects: [
      "Friend request",
      "Server invitation",
      "New message",
      "Security notice",
      "New login",
    ],
  },
  {
    name: "Spotify",
    email: "no-reply@spotify.com",
    category: "promotions",
    subjects: [
      "Discover Weekly",
      "Premium reminder",
      "New music for you",
      "Concert near you",
      "Playlist updated",
    ],
  },
  {
    name: "Netflix",
    email: "info@netflix.com",
    category: "promotions",
    subjects: [
      "New releases",
      "Watch now",
      "Subscription updated",
      "Payment reminder",
      "Top picks for you",
    ],
  },
  {
    name: "Steam",
    email: "noreply@steampowered.com",
    category: "promotions",
    subjects: [
      "Steam Guard",
      "Summer Sale",
      "Wishlist discount",
      "Gift received",
      "Purchase receipt",
    ],
  },
  {
    name: "PayPal",
    email: "service@paypal.com",
    category: "primary",
    subjects: [
      "Payment received",
      "Refund processed",
      "Money sent",
      "Invoice available",
      "Account update",
    ],
  },
  {
    name: "Binance",
    email: "do-not-reply@binance.com",
    category: "primary",
    subjects: [
      "Withdrawal confirmation",
      "Deposit completed",
      "P2P order updated",
      "Security verification",
      "New login",
    ],
  },
  {
    name: "OKX",
    email: "noreply@okx.com",
    category: "primary",
    subjects: [
      "P2P order completed",
      "Identity verified",
      "Security alert",
      "Withdrawal successful",
      "Login notification",
    ],
  },
];