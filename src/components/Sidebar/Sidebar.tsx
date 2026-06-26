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
      count: inbox.length,
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
    <aside className="w-[260px] bg-[#f6f8fc] px-3 py-4 overflow-y-auto">

      <button
        onClick={openCompose}
        className="flex items-center gap-4 bg-[#c2e7ff] rounded-2xl px-7 py-4 shadow hover:shadow-md transition mb-6"
      >
        <PenSquare size={20} />
        <span>Compose</span>
      </button>

      <nav className="space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-r-full px-4 py-2.5 ${
                  isActive
                    ? "bg-[#d3e3fd]"
                    : "hover:bg-[#e9eef6]"
                }`
              }
            >
              <div className="flex items-center gap-4">
                <Icon size={20} />
                <span>{item.title}</span>
              </div>

              <span>{item.count}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-8">
        <button className="flex items-center gap-2 mb-4">
          <ChevronDown size={16} />
          Labels
        </button>

        {labels.map((label) => (
          <button
            key={label}
            className="w-full flex items-center gap-3 rounded-r-full px-4 py-2 hover:bg-[#e9eef6]"
          >
            <Tag size={16} />
            {label}
          </button>
        ))}
      </div>

    </aside>
  );
}