import Toolbar from "../components/Toolbar/Toolbar";
import MailList from "../components/MailList/MailList";
import { useAccountStore } from "../store/accountStore";
import { buildConversation } from "../generators/conversationGenerator";

export default function Sent() {
  const account = useAccountStore(
    (state) => state.currentAccount
  );

  const conversations =
    (account?.sent ?? []).map((mail) =>
      buildConversation([mail])
    );

  return (
    <div className="h-full p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col">
        <Toolbar />

        <MailList
          conversations={conversations}
        />
      </div>
    </div>
  );
}