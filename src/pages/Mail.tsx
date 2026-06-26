import {
  ArrowLeft,
  Reply,
  Forward,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useMailStore } from "../store/mailStore";

function formatDate(date: Date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Mail() {
  const navigate = useNavigate();

  const { selectedConversation } =
    useMailStore();

  if (!selectedConversation) {
    return (
      <div className="p-10">
        Conversation not found
      </div>
    );
  }

  return (
    <div className="h-full bg-[#f6f8fc] p-4">

      <div className="bg-white rounded-2xl h-full overflow-auto">

        <div className="h-14 border-b flex items-center px-4">

          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </button>

        </div>

        <div className="max-w-4xl mx-auto p-8">

          <h1 className="text-3xl font-semibold mb-10">
            {selectedConversation.subject}
          </h1>

          {selectedConversation.messages.map((mail) => (

            <div
              key={mail.id}
              className="mb-10 border-b pb-8"
            >

              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                  {mail.sender.charAt(0)}
                </div>

                <div>

                  <div className="font-semibold">
                    {mail.sender}
                  </div>

                  <div className="text-sm text-gray-500">
                    {mail.senderEmail}
                  </div>

                  <div className="text-xs text-gray-400">
                    {formatDate(mail.date)}
                  </div>

                </div>

              </div>

              <div className="mt-6 whitespace-pre-wrap leading-8">
                {mail.body}
              </div>

            </div>

          ))}

          <div className="flex gap-3">

            <button className="px-6 py-3 rounded-full border flex items-center gap-2">
              <Reply size={18} />
              Reply
            </button>

            <button className="px-6 py-3 rounded-full border flex items-center gap-2">
              <Forward size={18} />
              Forward
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}