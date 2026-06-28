import { useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { useAccountStore } from "../../store/accountStore";
import { useMailStore } from "../../store/mailStore";
import { useNavigate } from "react-router-dom";

export default function AccountSwitcher() {
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  const navigate = useNavigate();

  const { setConversations } = useMailStore();
  const { currentAccount, accounts, setCurrentAccount } =
    useAccountStore();

  const firstName = currentAccount?.fullName?.split(" ")[0];

  // دالة تحويل الحساب مع تفعيل شاشة التحميل وتأخير عشوائي بين 1 و 4 ثوانٍ
  const handleAccountSwitch = async (account: typeof currentAccount) => {
    if (!account) return;

    setOpen(false);
    setSwitching(true);

    // تأخير عشوائي بين 1000 و 4000 مللي ثانية (من 1 إلى 4 ثوانٍ)
    const delay = 1000 + Math.random() * 3000;

    await new Promise((resolve) => setTimeout(resolve, delay));

    setCurrentAccount(account);
    setConversations(account.inbox);

    navigate("/inbox");

    setSwitching(false);
  };

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
        /* ① الحاوية الرئيسية: خلفية زرقاء فاتحة وحواف دائرية كبيرة مع تحديد ارتفاع مرن ونظام flex */
        <div className="absolute right-0 mt-2 w-[380px] h-[calc(100vh-90px)] rounded-[28px] bg-[#eef3fd] shadow-2xl border border-gray-200 z-50 p-4 flex flex-col">

          {/* ② الـ Header */}
          <div className="relative pb-5">

            {/* ③ زر الإغلاق مثل Gmail بالأعلى يسار */}
            <button
              onClick={() => setOpen(false)}
              className="absolute left-0 top-0 w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center"
            >
              <X size={22} />
            </button>

            <div className="text-xs text-gray-600 text-center font-medium">
              {currentAccount?.email}
            </div>

            {/* ④ تكبير حجم الأفاتار وتكبير الخط وتعديل المسافة العلوية */}
            <div className="flex justify-center mt-2">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                style={{ background: currentAccount?.avatarColor }}
              >
                {currentAccount?.avatarLetter}
              </div>
            </div>

            <div className="text-center mt-0.5 font-semibold text-[22px] text-gray-800">
              Welcome, {firstName}
            </div>

            {/* ⑤ زر إدارة الحساب ليصبح بطاقة عائمة ومريحة */}
            <div className="mt-1 flex justify-center">
              <button className="border border-gray-300 rounded-full px-5 py-1 text-[14px] text-blue-700 font-medium hover:bg-gray-100 transition">
                Manage your Google Account
              </button>
            </div>

          </div>

          <div className="mt-2 bg-white rounded-[24px] shadow-sm overflow-hidden flex-1">
            <div className="h-[430px] overflow-y-auto">

              {accounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleAccountSwitch(account)}
                  className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#e8eaed] last:border-b-0 hover:bg-gray-100 transition-colors duration-150"
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
              Add another account
            </button>

            <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-sm text-red-500 rounded-xl transition-colors">
              Sign out of all accounts
            </button>

          </div>

        </div>
      )}

      {/* شاشة التحميل الضبابية التي تظهر عند تحويل الحساب */}
      {switching && (
        <div className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl px-8 py-6 flex flex-col items-center gap-4">

            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />

            <div className="text-gray-700 font-medium">
              Loading your Gmail...
            </div>

          </div>
        </div>
      )}

    </div>
  );
}