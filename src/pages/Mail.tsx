import {
  ArrowLeft,
  Reply,
  Forward,
  Send,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useMailStore } from "../store/mailStore";

import { useState } from "react";
import { useAccountStore } from "../store/accountStore";
import { generateAutoReply } from "../generators/autoReplyGenerator";
import type { Mail as MailType } from "../models/mail";

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

    const mail: MailType = {
      id: crypto.randomUUID(),
      subject: selectedConversation.subject,
      body: reply,
      from: currentAccount.email,
      to: "customerservice@moneygram.com",
      sender: currentAccount.fullName,
      senderEmail: currentAccount.email,
      preview: reply.substring(0, 80),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      unread: false,
      read: true,
      starred: false,
      hasAttachment: false,
      attachments: [],
      date: now,
      direction: "outgoing",
      status: "sent",
    };

    // إرسال ردك الحالي فوراً
    replyToConversation(
      selectedConversation.id,
      mail
    );

    setReply("");
    setIsReplying(false);

    // تعريف وقت التأخير: 10 دقائق حقيقية (10 * 60 * 1000 مللي ثانية)
    const AUTO_REPLY_DELAY = 10 * 60 * 1000;

    // تشغيل المؤقت لإرسال الرد التلقائي بعد 10 دقائق
    setTimeout(() => {
      const autoReply =
        generateAutoReply(
          currentAccount,
          selectedConversation.subject,
          now
        );

      replyToConversation(
        selectedConversation.id,
        autoReply
      );
    }, AUTO_REPLY_DELAY);
  };

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

                  {/* التعديل المحدث لعرض To: بالشكل المطلوب بالملّي */}
                  <div className="text-sm text-gray-500">
                    {mail.direction === "outgoing" ? (
                      `To: ${mail.to}`
                    ) : (
                      mail.senderEmail
                    )}
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

          <div className="mt-8">

            {!isReplying && (
              <div className="flex gap-3">

                <button
                  onClick={() => setIsReplying(true)}
                  className="px-6 py-3 rounded-full border flex items-center gap-2 hover:bg-gray-100"
                >
                  <Reply size={18} />
                  Reply
                </button>

                <button
                  className="px-6 py-3 rounded-full border flex items-center gap-2 hover:bg-gray-100"
                >
                  <Forward size={18} />
                  Forward
                </button>

              </div>
            )}

            {isReplying && (
              <div className="space-y-4">

                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full h-40 border rounded-xl p-4 resize-none outline-none"
                />

                <div className="flex justify-end">

                  <button
                    onClick={sendReply}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center gap-2"
                  >
                    <Send size={18} />
                    Send
                  </button>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}