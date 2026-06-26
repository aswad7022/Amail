import {
  Inbox,
  Users,
  Tag,
  Bell,
} from "lucide-react";

import { useState } from "react";
import { useMailStore } from "../../store/mailStore";

export default function CategoryTabs() {
  const [active, setActive] = useState<
    "primary" | "social" | "promotions" | "updates"
  >("primary");

  const { conversations, filterCategory } =
    useMailStore();

  const count = (
    category:
      | "primary"
      | "social"
      | "promotions"
      | "updates"
  ) =>
    conversations.filter(
      (c) => c.category === category
    ).length;

  const tabs = [
    {
      key: "primary",
      title: "Primary",
      icon: Inbox,
      color: "text-blue-600",
      border: "border-blue-600",
    },
    {
      key: "social",
      title: "Social",
      icon: Users,
      color: "text-green-600",
      border: "border-green-600",
    },
    {
      key: "promotions",
      title: "Promotions",
      icon: Tag,
      color: "text-orange-500",
      border: "border-orange-500",
    },
    {
      key: "updates",
      title: "Updates",
      icon: Bell,
      color: "text-purple-600",
      border: "border-purple-600",
    },
  ] as const;

  return (
    <div className="grid grid-cols-4 border-b bg-white">

      {tabs.map((tab) => {

        const Icon = tab.icon;

        return (

          <button
            key={tab.key}
            onClick={() => {
              setActive(tab.key);
              filterCategory(tab.key);
            }}
            className={`h-14 flex items-center justify-center gap-3 border-b-4 transition ${
              active === tab.key
                ? tab.border
                : "border-transparent hover:bg-gray-100"
            }`}
          >

            <Icon
              size={18}
              className={tab.color}
            />

            <div className="text-left">

              <div
                className={`font-medium ${tab.color}`}
              >
                {tab.title}
              </div>

              <div className="text-xs text-gray-500">
                {count(tab.key)}
              </div>

            </div>

          </button>

        );
      })}

    </div>
  );
}