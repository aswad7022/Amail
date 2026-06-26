import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Inbox from "./pages/Inbox";
import Mail from "./pages/Mail";
import Sent from "./pages/Sent";

import { getAccounts } from "./database/database";

import { useAccountStore } from "./store/accountStore";
import { useMailStore } from "./store/mailStore";

function App() {
  const {
    setAccounts,
    currentAccount,
  } = useAccountStore();

  const {
    setConversations,
  } = useMailStore();

  useEffect(() => {
    setAccounts(getAccounts());
  }, [setAccounts]);

  useEffect(() => {
    if (!currentAccount) return;

    setConversations(currentAccount.inbox);
  }, [currentAccount, setConversations]);

  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/inbox" replace />}
        />

        <Route
          path="/inbox"
          element={<Inbox />}
        />

        <Route
          path="/sent"
          element={<Sent />}
        />

        <Route
          path="/mail/:id"
          element={<Mail />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;