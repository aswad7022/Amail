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
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
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
      <div className="w-[520px] border-l border-gray-200 bg-white flex items-center justify-center text-gray-400">
        Select an email
      </div>
    );
  }

  return (
    /* ① تعديل عرض الحاوية لتصبح أعرض ومطابقة لأبعاد Gmail */
    <div
      className="w-[520px] bg-white border-l border-gray-200 flex flex-col relative z-50"
      style={{ pointerEvents: "auto" }}
    >
      
      {/* ② الـ Header الجديد مع أدوات التحكم (أرشفة، حذف، حظر، المزيد) */}
      <div className="border-b bg-white px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[22px] font-normal text-gray-800">
              {selectedConversation.subject}
            </h2>
            <Star
              size={18}
              className="text-gray-400 hover:text-yellow-500 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100">🗄️</button>
            <button className="p-2 rounded-full hover:bg-gray-100">🗑️</button>
            <button className="p-2 rounded-full hover:bg-gray-100">🚫</button>
            <button className="p-2 rounded-full hover:bg-gray-100">⋮</button>
          </div>
        </div>
      </div>

      {/* ⑤ تكبير المسافات الداخلية والحواشي للرسائل */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {selectedConversation.messages.map((mail) => (
          <div key={mail.id}>
            <div
              className={`flex ${
                mail.direction === "outgoing" ? "justify-end" : "justify-start"
              }`}
            >
              {/* ③ و ④ تعديل شكل وألوان الرسائل (خلفية زرقاء فاتحة للصادر، بيضاء وحواف رمادية للوارد) */}
              <div
                className={`max-w-[95%] rounded-xl border shadow-sm px-5 py-4 ${
                  mail.direction === "outgoing"
                    ? "bg-[#E8F0FE] border-blue-200 text-gray-900"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* ⑥ تعديل حجم وخط اسم المرسل */}
                <div className="text-[15px] font-semibold text-gray-900 mb-1">
                  {mail.sender}
                </div>

                {/* ⑦ تعديل حجم وتباعد أسطر نص الرسالة */}
                <div className="whitespace-pre-wrap text-[15px] leading-7 text-gray-800">
                  {mail.body}
                </div>

                {mail.hasAttachment && (
                  <div className="mt-4 flex gap-2 items-center text-gray-600">
                    <Paperclip size={16} />
                    {mail.attachments[0]}
                  </div>
                )}

                {/* ⑧ تعديل خط وتباعد التاريخ */}
                <div className="mt-5 text-xs text-gray-500">
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
                /* ⑫ تم حذف أسطر الـ console.log والـ alert غير الضرورية */
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
            {/* ⑨ و ⑩ تعديل الـ textarea لتصبح أكبر، مريحة، وبحواف ناعمة مع تفعيل الـ focus */}
            <textarea
              rows={7}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full min-h-[170px] rounded-2xl border border-gray-300 px-5 py-4 resize-none outline-none focus:border-blue-500"
              placeholder="Reply..."
            />

            <div className="flex justify-end mt-3">
              {/* ⑪ تعديل تصميم ولون زر الإرسال المريح للعين المتناسق مع هوية جوجل الجديدة */}
              <button
                onClick={sendReply}
                className="bg-[#0B57D0] hover:bg-[#0842a0] text-white rounded-full px-7 py-3 flex items-center gap-2 transition"
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