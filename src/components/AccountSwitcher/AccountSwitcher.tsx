import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { useAccountStore } from "../../store/accountStore";
import { useMailStore } from "../../store/mailStore";
import { useNavigate } from "react-router-dom";

export default function AccountSwitcher() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { setConversations } = useMailStore();
  const { currentAccount, accounts, setCurrentAccount } =
    useAccountStore();

  const firstName = currentAccount?.fullName?.split(" ")[0];

  return (
    <div className="relative">

      {/* BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100"
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ background: currentAccount?.avatarColor }}
        >
          {currentAccount?.avatarLetter}
        </div>

        <ChevronDown size={18} />
      </button>

      {/* DROPDOWN */}
      {open && (
        /* ① تعديل الحاوية الرئيسية: خلفية زرقاء فاتحة وحواف دائرية كبيرة */
        <div className="absolute right-0 mt-2 w-[380px] rounded-[28px] bg-[#eef3fd] shadow-2xl border border-gray-200 z-50 p-4">

          {/* ② تعديل الـ Header */}
          <div className="relative pb-5">

            {/* ③ زر الإغلاق مثل Gmail بالأعلى يسار */}
            <button
              onClick={() => setOpen(false)}
              className="absolute left-0 top-0 w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center"
            >
              <X size={22} />
            </button>

            <div className="text-xs text-gray-500 text-center">
              {currentAccount?.email}
            </div>

            {/* ④ تكبير حجم الأفاتار وتكبير الخط */}
            <div className="flex justify-center mt-3">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-white text-5xl font-bold"
                style={{ background: currentAccount?.avatarColor }}
              >
                {currentAccount?.avatarLetter}
              </div>
            </div>

            <div className="text-center mt-2 font-semibold text-lg text-gray-800">
              مرحباً، {firstName}
            </div>

            {/* ⑤ تعديل زر إدارة الحساب ليصبح بطاقة عائمة ومريحة */}
            <div className="mt-5 flex justify-center">
              <button className="border border-gray-400 rounded-full px-7 py-3 text-blue-700 font-medium hover:bg-gray-100 transition">
                إدارة حسابك على Google
              </button>
            </div>

          </div>

          {/* ⑥ أهم تعديل: عزل مربع الحسابات بخلفية بيضاء مستقلة وسكرول داخلي */}
          <div className="mt-6 bg-white rounded-[24px] shadow-sm overflow-hidden">
            <div className="max-h-[280px] overflow-y-auto">

              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => {
                    setCurrentAccount(account);
                    setConversations(account.inbox);
                    setOpen(false);
                    navigate("/inbox");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors duration-150"
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ background: account.avatarColor }}
                  >
                    {account.avatarLetter}
                  </div>

                  <div className="text-left">
                    <div className="font-medium text-gray-800">
                      {account.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {account.email}
                    </div>
                  </div>
                </button>
              ))}

            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t mt-4">

            <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm mt-2 rounded-xl transition-colors">
              <Plus size={16} />
              إضافة حساب آخر
            </button>

            <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm text-red-500 rounded-xl transition-colors">
              تسجيل الخروج من جميع الحسابات
            </button>

          </div>

        </div>
      )}

    </div>
  );
}