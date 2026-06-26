import {
  Menu,
  Search,
  SlidersHorizontal,
  HelpCircle,
  Settings,
  Grid2x2,
} from "lucide-react";

import logo from "../../assets/logo.png";
import AccountSwitcher from "../AccountSwitcher/AccountSwitcher";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4">

      {/* Left */}
      <div className="flex items-center gap-3 w-[260px]">

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Menu size={22} />
        </button>

        <img
          src={logo}
          alt="AMail"
          className="h-10 object-contain select-none"
          draggable={false}
        />

      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">

        <div className="w-full max-w-[720px] h-12 rounded-full bg-[#eaf1fb] hover:shadow-sm transition flex items-center px-5">

          <Search
            size={20}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search mail"
            className="flex-1 bg-transparent outline-none px-4 text-[15px]"
          />

          <button className="w-9 h-9 rounded-full hover:bg-gray-200 flex items-center justify-center">
            <SlidersHorizontal size={18} />
          </button>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2">

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <HelpCircle size={20} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Settings size={20} />
        </button>

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center">
          <Grid2x2 size={20} />
        </button>

        <AccountSwitcher />

      </div>

    </header>
  );
}