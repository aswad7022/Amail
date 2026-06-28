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

  /* ⑨ و 🔟 و ⑪ إعادة هيكلة الألوان والحدود لتطابق توزيع ألوان Gmail الرسمي */
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
      color: "text-blue-600", // أزرق مثل Gmail
      border: "border-blue-600",
    },
    {
      key: "promotions",
      title: "Promotions",
      icon: Tag,
      color: "text-green-600", // أخضر مثل Gmail
      border: "border-green-600",
    },
    {
      key: "updates",
      title: "Updates",
      icon: Bell,
      color: "text-orange-500", // برتقالي مثل Gmail
      border: "border-orange-500",
    },
  ] as const;

  return (
    /* ① ضبط ارتفاع الـ Tabs ولون الإطار السفلي */
    <div className="grid grid-cols-4 bg-white border-b border-[#e0e0e0] h-[56px]">

      {tabs.map((tab) => {
        const Icon = tab.icon;

        return (
          /* ② و ③ تنعيم الأنيميشن وتحديث سماكة الإطار السفلي وتعديل خلفية الـ Hover */
          <button
            key={tab.key}
            onClick={() => {
              setActive(tab.key);
              filterCategory(tab.key);
            }}
            className={`relative h-full flex items-center justify-center gap-3 border-b-[3px] transition-all duration-150 ${
              active === tab.key
                ? tab.border
                : "border-transparent hover:bg-[#f6f8fc]"
            }`}
          >
            {/* ④ تكبير حجم الأيقونة (size=20) وتلوينها بحسب حالة التبويب النشط */}
            <Icon
              size={20}
              className={active === tab.key ? tab.color : "text-gray-500"}
            />

            {/* ⑧ تفعيل الـ leading لتنظيم تباعد الأسطر */}
            <div className="text-left leading-4 flex items-center gap-2">
              
              {/* ⑤ تلوين عنوان التبويب باللون المخصص فقط إذا كان هو النشط (Active) */}
              <div
                className={`text-sm font-medium ${
                  active === tab.key
                    ? tab.color
                    : "text-gray-600"
                }`}
              >
                {tab.title}
              </div>

              {/* ⑥ و ⑦ إظهار شارات الأرقام (Badges) الدائرية الملونة إذا كان العداد أكبر من صفر */}
              {count(tab.key) > 0 && (
                <span
                  className={`rounded-full px-2 py-[2px] text-[11px] font-semibold text-white ${
                    tab.key === "primary"
                      ? "bg-blue-600"
                      : tab.key === "social"
                      ? "bg-blue-600"
                      : tab.key === "promotions"
                      ? "bg-green-600"
                      : "bg-orange-500"
                  }`}
                >
                  {count(tab.key)}
                </span>
              )}

            </div>
          </button>
        );
      })}

    </div>
  );
}