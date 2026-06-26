import { Paperclip, Star } from "lucide-react";
import { useMailStore } from "../../store/mailStore";

export default function MailViewer() {
  const { selectedMail } = useMailStore();

  if (!selectedMail) {
    return (
      <div className="w-[420px] border-l border-gray-200 bg-white flex items-center justify-center text-gray-400">
        Select an email
      </div>
    );
  }

  return (
    <div className="w-[420px] bg-white border-l border-gray-200 flex flex-col">

      {/* Header */}

      <div className="border-b border-gray-200 p-6">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            {selectedMail.subject}
          </h2>

          <button>
            <Star
              size={20}
              className={
                selectedMail.starred
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-400"
              }
            />
          </button>

        </div>

        <div className="mt-6 flex gap-4">

          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            {selectedMail.sender.charAt(0)}
          </div>

          <div>

            <div className="font-semibold">
              {selectedMail.sender}
            </div>

            <div className="text-sm text-gray-500">
              {selectedMail.senderEmail}
            </div>

            <div className="text-xs text-gray-400 mt-1">
              {selectedMail.time}
            </div>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="flex-1 overflow-y-auto p-6 whitespace-pre-wrap leading-8 text-gray-700">

        {selectedMail.body}

        {selectedMail.hasAttachment && (

          <div className="mt-10 flex items-center gap-3 border rounded-xl px-4 py-3 w-fit">

            <Paperclip size={18} />

            <span>
              {selectedMail.attachments[0]}
            </span>

          </div>

        )}

      </div>

    </div>
  );
}