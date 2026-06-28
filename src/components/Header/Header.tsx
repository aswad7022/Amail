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
import { useMailStore } from "../../store/mailStore";

export default function Header() {
  const { search, setSearch } = useMailStore();

  return (
    /* ① جعل الهيدر ثابتاً في الأعلى مع ضبط لون الإطار السفلي والـ z-index */
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-[#eceff1] flex items-center px-4">

      {/* ② تعديل عرض ومسافات الجزء الأيسر ليتناسق مع الـ Sidebar الجديد */}
      <div className="flex items-center gap-2 w-[250px]">

        <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
          <Menu size={22} />
        </button>

        {/* ③ تعديل حجم الشعار ليصبح (h-9) بدلاً من (h-11) */}
        <img
          src={logo}
          alt="AMail"
          className="h-9 object-contain select-none"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        />

      </div>

      {/* Search */}
      <div className="flex-1 flex justify-center">

        {/* ④ زيادة العرض الأقصى لصندوق البحث وتحسين الظلال والتنقل الناعم */}
        <div className="w-full max-w-[760px] h-12 rounded-full bg-[#eaf1fb] hover:shadow-md focus-within:shadow-md transition-all duration-200 flex items-center px-5">

          {/* ⑤ تعديل لون أيقونة البحث لتصبح أغمق */}
          <Search
            size={20}
            className="text-gray-600"
          />

          {/* ⑥ و 🔟 تعديل الـ placeholder ولونه وربطه بالـ Store */}
          <input
            type="text"
            placeholder="Search in mail"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none px-4 text-[15px] placeholder:text-gray-500"
          />

          {/* ⑦ تنسيق لون وتأثير زر الفلترة الجانبي */}
          <button className="w-10 h-10 rounded-full hover:bg-[#dfe3eb] flex items-center justify-center transition">
            <SlidersHorizontal size={18} />
          </button>

        </div>

      </div>

      {/* Right */}
      {/* ⑧ و ⑨ تحسين خلفية الأزرار وتأثير الانتقال وإضافة الـ Tooltips (title) */}
      <div className="flex items-center gap-2">

        <button 
          title="Help"
          className="w-10 h-10 rounded-full hover:bg-[#eceff1] transition flex items-center justify-center"
        >
          <HelpCircle size={20} />
        </button>

        <button 
          title="Settings"
          className="w-10 h-10 rounded-full hover:bg-[#eceff1] transition flex items-center justify-center"
        >
          <Settings size={20} />
        </button>

        <button 
          title="Google Apps"
          className="w-10 h-10 rounded-full hover:bg-[#eceff1] transition flex items-center justify-center"
        >
          <Grid2x2 size={20} />
        </button>

        <AccountSwitcher />

      </div>

    </header>
  );
}