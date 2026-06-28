import {
  Minimize2,
  Maximize2,
  X,
  Paperclip,
  Smile,
  Link,
  Send,
} from "lucide-react";

import { useComposeStore } from "../../store/composeStore";
import { useAccountStore } from "../../store/accountStore";
import { useMailStore } from "../../store/mailStore";

import { buildConversation } from "../../generators/conversationGenerator";

import type { Mail } from "../../models/mail";

export default function Compose() {
  const {
    open,
    closeCompose,
    clear,
    to,
    subject,
    body,
    setTo,
    setSubject,
    setBody,
  } = useComposeStore();

  const {
    currentAccount,
    addSentMail,
  } = useAccountStore();

  const {
    addConversation,
  } = useMailStore();

  if (!open) return null;
  if (!currentAccount) return null;

  const account = currentAccount;

  function sendMail() {
    if (
      !to.trim() ||
      !subject.trim() ||
      !body.trim()
    ) {
      return;
    }

    const now = new Date();

    const mail: Mail = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      subject,
      body,
      from: account.email,
      to,
      sender: account.fullName,
      senderEmail: account.email,
      preview: body.substring(0, 80),
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

    addSentMail(mail);

    // التعديل الجديد والمحدد لمنع تكرار الـ Conversations لـ MoneyGram
    if (
      to.toLowerCase() ===
      "customerservice@moneygram.com"
    ) {
      const existing =
        account.inbox.find(
          (c) =>
            c.senderEmail.toLowerCase() ===
            "customerservice@moneygram.com"
        );

      if (existing) {
        // مؤقتًا لا ننشئ Conversation جديدة
      } else {
        addConversation(
          buildConversation([mail])
        );
      }
    }

    clear();
    closeCompose();
  }

  return (
    <div className="fixed bottom-0 right-20 w-[620px] bg-white rounded-t-2xl shadow-2xl border border-gray-300 overflow-hidden z-50">

      <div className="h-12 bg-[#f2f6fc] flex items-center justify-between px-4 border-b">
        <span className="font-medium">
          New Message
        </span>

        <div className="flex gap-1">
          <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center">
            <Minimize2 size={16} />
          </button>
          <button className="w-8 h-8 rounded hover:bg-gray-200 flex items-center justify-center">
            <Maximize2 size={16} />
          </button>
          <button
            onClick={closeCompose}
            className="w-8 h-8 rounded hover:bg-red-100 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full h-12 px-4 border-b outline-none"
        placeholder="To"
      />

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full h-12 px-4 border-b outline-none"
        placeholder="Subject"
      />

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full h-80 p-4 resize-none outline-none"
        placeholder="Write your message..."
      />

      <div className="h-14 border-t flex items-center justify-between px-4">
        <button
          onClick={sendMail}
          className="bg-blue-600 text-white rounded-full px-6 py-2 flex items-center gap-2 hover:bg-blue-700"
        >
          <Send size={18} />
          Send
        </button>

        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <Paperclip size={18} />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <Link size={18} />
          </button>
          <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
            <Smile size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}