import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { useAccountStore } from "../../store/accountStore";

export default function AccountSwitcher() {
  const [open, setOpen] = useState(false);

  const {
    currentAccount,
    accounts,
    setCurrentAccount,
  } = useAccountStore();

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full hover:bg-gray-100 px-3 py-2 transition"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
          style={{
            background:
              currentAccount?.avatarColor ?? "#1A73E8",
          }}
        >
          {currentAccount?.avatarLetter ?? "A"}
        </div>

        <ChevronDown
          size={18}
          className="text-gray-500"
        />
      </button>

      {open && (

        <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden z-50">

          <div className="p-5 border-b">

            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto"
              style={{
                background:
                  currentAccount?.avatarColor ?? "#1A73E8",
              }}
            >
              {currentAccount?.avatarLetter ?? "A"}
            </div>

            <h3 className="text-center mt-3 font-semibold">
              {currentAccount?.fullName}
            </h3>

            <p className="text-center text-sm text-gray-500">
              {currentAccount?.email}
            </p>

          </div>

          <div className="max-h-72 overflow-y-auto">

            {accounts.map((account) => (

              <button
                key={account.id}
                onClick={() => {
                  setCurrentAccount(account);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition"
              >

                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{
                    background: account.avatarColor,
                  }}
                >
                  {account.avatarLetter}
                </div>

                <div className="text-left">

                  <div className="font-medium">
                    {account.fullName}
                  </div>

                  <div className="text-sm text-gray-500">
                    {account.email}
                  </div>

                </div>

              </button>

            ))}

          </div>

          <button className="w-full flex items-center gap-3 px-4 py-4 border-t hover:bg-gray-100">

            <Plus size={18} />

            Add another account

          </button>

        </div>

      )}

    </div>
  );
}