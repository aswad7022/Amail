import {
  PenSquare,
  Inbox,
  Star,
  Clock3,
  BadgeAlert,
  Send,
  FileText,
  ShieldAlert,
  Trash2,
  ChevronDown,
  Tag,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useComposeStore } from "../../store/composeStore";
import { useAccountStore } from "../../store/accountStore";

export default function Sidebar() {
  const { openCompose } = useComposeStore();

  const currentAccount = useAccountStore(
    (state) => state.currentAccount
  );

  const inbox = currentAccount?.inbox ?? [];
  const sent = currentAccount?.sent ?? [];
  const drafts = currentAccount?.drafts ?? [];
  const spam = currentAccount?.spam ?? [];
  const trash = currentAccount?.trash ?? [];

  const starred = inbox.filter((m) => m.starred).length;

  const important = inbox.filter(
    (m) => m.unread || m.starred
  ).length;

  const menu = [
    {
      icon: Inbox,
      title: "Inbox",
      count: inbox.filter((m) => m.unread).length,
      path: "/inbox",
    },
    {
      icon: Star,
      title: "Starred",
      count: starred,
      path: "/starred",
    },
    {
      icon: Clock3,
      title: "Snoozed",
      count: 0,
      path: "/snoozed",
    },
    {
      icon: BadgeAlert,
      title: "Important",
      count: important,
      path: "/important",
    },
    {
      icon: Send,
      title: "Sent",
      count: sent.length,
      path: "/sent",
    },
    {
      icon: FileText,
      title: "Drafts",
      count: drafts.length,
      path: "/drafts",
    },
    {
      icon: ShieldAlert,
      title: "Spam",
      count: spam.length,
      path: "/spam",
    },
    {
      icon: Trash2,
      title: "Trash",
      count: trash.length,
      path: "/trash",
    },
  ];

  const labels = [
    "Work",
    "Personal",
    "Shopping",
    "Travel",
  ];

  return (
    <aside className="w-[256px] bg-[#f6f8fc] px-2 py-3 overflow-y-auto">

      {/* زر الـ Compose */}
      <button
        onClick={openCompose}
        className="flex items-center gap-4 bg-[#c2e7ff] rounded-2xl h-14 px-6 shadow-sm hover:shadow-md transition-all duration-200 mb-6 ml-2"
      >
        <PenSquare size={22} strokeWidth={2} />
        <span className="text-sm font-medium text-gray-900">Compose</span>
      </button>

      {/* قائمة التنقل الرئيسية */}
      <nav className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-r-full pl-6 pr-4 h-8 transition-colors ${
                  isActive
                    ? "bg-[#d3e3fd] font-semibold text-black"
                    : "hover:bg-[#eaedf0] text-gray-700"
                }`
              }
            >
              <div className="flex items-center gap-4 text-sm">
                <Icon size={18} strokeWidth={2} />
                <span>{item.title}</span>
              </div>

              <span className="text-xs font-medium text-gray-600">
                {item.count}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* قسم الـ Labels */}
      <div className="mt-7 border-t border-gray-200 pt-4">
        <button className="flex items-center gap-2 px-4 mb-3 text-sm font-medium text-gray-600">
          <ChevronDown size={16} />
          Labels
        </button>

        {labels.map((label) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 rounded-r-full px-6 h-8 hover:bg-[#eaedf0] text-sm text-gray-700 transition-colors"
          >
            <Tag size={16} />
            {label}
          </button>
        ))}
      </div>

    </aside>
  );
}