import {
  Star,
  Paperclip,
  Archive,
  Trash2,
  MailOpen,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useMailStore } from "../../store/mailStore";

function formatDate(date: Date) {
  const now = new Date();

  if (
    date.toDateString() ===
    now.toDateString()
  ) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

export default function MailList() {
  const navigate = useNavigate();

  const {
    conversations,
    selectConversation,
  } = useMailStore();

  return (
    <div className="flex-1 overflow-y-auto bg-white">

      {conversations.map((conversation) => (

        <div
          key={conversation.id}
          onClick={() => {
            selectConversation(conversation.id);
            navigate(`/mail/${conversation.id}`);
          }}
          className="group flex items-center px-3 py-2 border-b border-[#f1f3f4] hover:bg-[#f2f6fc] cursor-pointer text-sm"
        >

          {/* Checkbox مصغر مثل Gmail */}
          <div className="w-8 flex justify-center">
            <input
              type="checkbox"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Star مصغر مثل Gmail */}
          <div className="w-8 flex justify-center">
            <Star
              size={16}
              className={
                conversation.starred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }
            />
          </div>

          <div className="w-2" />

          {/* الفحص الذكي لاسم MoneyGram */}
          <div className="w-[180px] truncate font-medium">
            {conversation.subject === "Request for Refund Status and Transaction Inquiry"
              ? "MoneyGram"
              : conversation.sender}
          </div>

          {/* الـ subject + preview بأسلوب Gmail */}
          <div className="flex-1 truncate text-gray-800">
            <span
              className={
                conversation.unread
                  ? "font-semibold"
                  : ""
              }
            >
              {conversation.subject}
            </span>

            <span className="text-gray-500">
              {" — "}
              {conversation.preview}
            </span>
          </div>

          {/* أيقونة المرفقات يمين */}
          <div className="w-6 flex justify-center">
            {conversation.hasAttachment && (
              <Paperclip
                size={14}
                className="text-gray-400"
              />
            )}
          </div>

          {/* التاريخ وأزرار التحكم السريعة عند الـ Hover */}
          <div className="w-[90px] flex justify-end items-center">

            <span className="group-hover:hidden text-right text-xs text-gray-500">
              {formatDate(
                conversation.messages.at(-1)!.date
              )}
            </span>

            <div className="hidden group-hover:flex gap-2 text-gray-500">
              <Archive size={16} className="hover:text-gray-800 cursor-pointer" />
              <Trash2 size={16} className="hover:text-red-500 cursor-pointer" />
              <MailOpen size={16} className="hover:text-gray-800 cursor-pointer" />
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}