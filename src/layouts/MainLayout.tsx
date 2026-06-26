import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import RightSidebar from "../components/RightSidebar/RightSidebar";
import Compose from "../components/Compose/Compose";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  return (
    <div className="h-screen bg-[#f6f8fc] flex flex-col">

      <Header />

      <div className="grid grid-cols-[260px_1fr_64px] flex-1 overflow-hidden">

        {/* Left Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="overflow-hidden">
          {children}
        </main>

        {/* Right Sidebar */}
        <RightSidebar />

      </div>

      {/* Compose Window */}
      <Compose />

    </div>
  );
}