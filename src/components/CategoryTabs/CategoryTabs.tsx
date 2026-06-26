import {
  Inbox,
  Users,
  Tag,
  Bell,
} from "lucide-react";

import { useAccountStore } from "../../store/accountStore";

export default function CategoryTabs() {
  const account = useAccountStore(
    (state) => state.currentAccount
  );

  const inbox = account?.inbox ?? [];

  const social = inbox.filter((m) =>
    m.sender.includes("TikTok") ||
    m.sender.includes("Facebook") ||
    m.sender.includes("Instagram")
  ).length;

  const updates = inbox.filter((m) =>
    m.sender.includes("Google") ||
    m.sender.includes("Microsoft") ||
    m.sender.includes("Apple")
  ).length;

  const promotions = inbox.length - social - updates;

  const primary = 1;

  const tabs = [
    {
      title: "Primary",
      icon: Inbox,
      color: "text-blue-600",
      border: "border-blue-600",
      count: primary,
      active: true,
    },
    {
      title: "Social",
      icon: Users,
      color: "text-green-600",
      border: "border-green-600",
      count: social,
      active: false,
    },
    {
      title: "Promotions",
      icon: Tag,
      color: "text-orange-500",
      border: "border-orange-500",
      count: promotions,
      active: false,
    },
    {
      title: "Updates",
      icon: Bell,
      color: "text-purple-600",
      border: "border-purple-600",
      count: updates,
      active: false,
    },
  ];

  return (
    <div className="grid grid-cols-4 border-b border-gray-200 bg-white">
      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.title}
            className={`h-[56px] flex items-center justify-center gap-3 text-sm hover:bg-gray-100 border-b-4 ${
              tab.active ? tab.border : "border-transparent"
            }`}
          >
            <Icon size={18} className={tab.color} />

            <div className="flex flex-col items-start">
              <span className={`font-medium ${tab.color}`}>
                {tab.title}
              </span>

              <span className="text-[11px] text-gray-500">
                {tab.count}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}