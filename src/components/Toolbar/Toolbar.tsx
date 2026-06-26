import {
  CheckSquare,
  ChevronDown,
  RefreshCcw,
  MoreVertical,
  Archive,
  Trash2,
  Ban,
  FolderInput,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAccountStore } from "../../store/accountStore";

export default function Toolbar() {
  const account = useAccountStore(
    (state) => state.currentAccount
  );

  const total = account?.inbox.length ?? 0;

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4">

      <div className="flex items-center gap-1">

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <CheckSquare size={18} />
        </button>

        <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <ChevronDown size={16} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <RefreshCcw size={18} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Archive size={18} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Trash2 size={18} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Ban size={18} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <FolderInput size={18} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Tag size={18} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <MoreVertical size={18} />
        </button>

      </div>

      <div className="flex items-center gap-2">

        <span className="text-sm text-gray-500">
          {total === 0 ? "0" : `1–${Math.min(50, total)} of ${total}`}
        </span>

        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>

        <button className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}