import {
  Paperclip,
  Star,
  Reply,
  Forward,
  Send,
} from "lucide-react";

import { useState } from "react";
import { useMailStore } from "../../store/mailStore";
import { useAccountStore } from "../../store/accountStore";
import { generateAutoReply } from "../../generators/autoReplyGenerator";

import type { Mail } from "../../models/mail";

export default function MailViewer() {
  const {
    selectedConversation,
    replyToConversation,
  } = useMailStore();

  const { currentAccount } = useAccountStore();
  
  const [reply, setReply] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const sendReply = () => {
    if (
      !currentAccount ||
      !selectedConversation ||
      !reply.trim()
    ) {
      return;
    }

    const now = new Date();

    const mail: Mail = {
      id: crypto.randomUUID(),
      subject: selectedConversation.subject,
      body: reply,
      from: currentAccount.email,
      to: "customerservice@moneygram.com",
      sender: currentAccount.fullName,
      senderEmail: currentAccount.email,
      preview: reply.substring(0, 80),
      time: now.toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      ),
      unread: false,
      read: true,
      starred: false,
      hasAttachment: false,
      attachments: [],
      date: now,
      direction: "outgoing",
      status: "sent",
    };

    replyToConversation(
      selectedConversation.id,
      mail
    );

    setReply("");
    setIsReplying(false);

    setTimeout(() => {
      if (!currentAccount) return;

      const auto =
        generateAutoReply(
          currentAccount,
          selectedConversation.subject,
          now
        );

      replyToConversation(
        selectedConversation.id,
        auto
      );
    }, 3000);
  };

  if (!selectedConversation) {
    return (
      <div className="w-[420px] border-l border-gray-200 bg-white flex items-center justify-center text-gray-400">
        Select an email
      </div>
    );
  }

  return (
    /* التعديل الجديد والاختبار هنا على مستوى الحاوية الكبيرة */
    <div
      className="w-[420px] bg-white border-l border-gray-200 flex flex-col relative z-50"
      style={{ pointerEvents: "auto" }}
    >
      
      <div className="border-b p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {selectedConversation.subject}
          </h2>
          <Star size={20} className="text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8">
        {selectedConversation.messages.map((mail) => (
          <div key={mail.id}>
            <div
              className={`flex ${
                mail.direction === "outgoing" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 ${
                  mail.direction === "outgoing"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                <div className="text-sm font-semibold mb-1">
                  {mail.sender}
                </div>

                <div className="whitespace-pre-wrap leading-7">
                  {mail.body}
                </div>

                {mail.hasAttachment && (
                  <div className="mt-4 flex gap-2 items-center">
                    <Paperclip size={16} />
                    {mail.attachments[0]}
                  </div>
                )}

                <div className="mt-4 text-xs opacity-70">
                  {mail.date.toLocaleDateString()} {mail.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2 mb-3">
          {!isReplying && (
            <button
              onClick={() => {
                console.log("Reply clicked");
                alert("Reply clicked");
                setIsReplying(true);
              }}
              className="flex items-center gap-2 text-sm hover:bg-gray-100 px-3 py-2 rounded-lg"
            >
              <Reply size={16} />
              Reply
            </button>
          )}
          
          {!isReplying && (
            <button className="flex items-center gap-2 text-sm hover:bg-gray-100 px-3 py-2 rounded-lg">
              <Forward size={16} />
              Forward
            </button>
          )}
        </div>

        {isReplying && (
          <>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full h-32 border rounded-xl p-3 resize-none outline-none"
              placeholder="Reply..."
            />

            <div className="flex justify-end mt-3">
              <button
                onClick={sendReply}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 flex items-center gap-2"
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </>
        )}
      </div>

    </div>
  );
}