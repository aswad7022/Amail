import Toolbar from "../components/Toolbar/Toolbar";
import CategoryTabs from "../components/CategoryTabs/CategoryTabs";
import MailList from "../components/MailList/MailList";

export default function Inbox() {
  return (
    <div className="h-full p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col">

        <Toolbar />

        <CategoryTabs />

        <MailList />

      </div>
    </div>
  );
}