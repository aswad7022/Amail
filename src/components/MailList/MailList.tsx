import {
  Star,
  Paperclip,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useMailStore } from "../../store/mailStore";

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
          className="group h-[44px] border-b border-gray-100 flex items-center px-4 hover:bg-white hover:shadow-sm cursor-pointer"
        >

          <div className="w-10" />

          <div className="w-10 flex justify-center">

            <Star
              size={18}
              className={
                conversation.starred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }
            />

          </div>

          <div className="w-12 flex justify-center">

            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">

              {conversation.sender.charAt(0)}

            </div>

          </div>

          <div className="w-[220px] truncate">

            {conversation.sender}

          </div>

          <div className="flex-1 truncate">

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

          <div className="w-8">

            {conversation.hasAttachment && (
              <Paperclip
                size={15}
                className="text-gray-400"
              />
            )}

          </div>

          <div className="w-[100px] text-right text-xs text-gray-500">

            {conversation.time}

          </div>

        </div>

      ))}

    </div>
  );
}