import { useNavigate } from "react-router-dom";

import { useAccountStore } from "../store/accountStore";
import { useMailStore } from "../store/mailStore";
import { buildConversation } from "../generators/conversationGenerator";

export default function Sent() {
  const navigate = useNavigate();

  const account = useAccountStore(
    (state) => state.currentAccount
  );

  // التعديل الأول: استبدال setConversations بـ openConversation
  const { openConversation } = useMailStore();

  const mails = account?.sent ?? [];

  return (
    <div className="p-4">

      <div className="bg-white rounded-2xl border overflow-hidden">

        {mails.map((mail) => (

          <div
            key={mail.id}
            onClick={() => {
              // التعديل الثاني: فتح المحادثة دون مسح الـ Inbox والـ الانتقال للرابط
              const conversation = buildConversation([mail]);

              openConversation(conversation);

              navigate(
                `/mail/${conversation.id}`
              );
            }}
            className="px-5 py-4 border-b hover:bg-gray-50 cursor-pointer"
          >

            <div className="font-semibold">
              {mail.subject}
            </div>

            <div className="text-sm text-gray-500">
              To: {mail.to}
            </div>

            <div className="text-sm text-gray-600">
              {mail.preview}
            </div>

            <div className="text-xs text-gray-400">
              {mail.date.toLocaleDateString()}{" "}
              {mail.time}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}