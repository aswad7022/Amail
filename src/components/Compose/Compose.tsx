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

export default function Compose() {
  const { open, closeCompose } = useComposeStore();

  if (!open) return null;

  return (
    <div className="fixed bottom-0 right-20 w-[620px] bg-white rounded-t-2xl shadow-2xl border border-gray-300 overflow-hidden z-50">

      {/* Header */}

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

      {/* Fields */}

      <input
        className="w-full h-12 px-4 border-b outline-none"
        placeholder="To"
      />

      <input
        className="w-full h-12 px-4 border-b outline-none"
        placeholder="Subject"
      />

      <textarea
        className="w-full h-80 p-4 resize-none outline-none"
        placeholder="Write your message..."
      />

      {/* Footer */}

      <div className="h-14 border-t flex items-center justify-between px-4">

        <button className="bg-blue-600 text-white rounded-full px-6 py-2 flex items-center gap-2 hover:bg-blue-700">

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