import {
  CalendarDays,
  CheckSquare,
  Users,
  StickyNote,
  Plus,
} from "lucide-react";

const items = [
  { icon: CalendarDays, color: "text-blue-600" },
  { icon: CheckSquare, color: "text-green-600" },
  { icon: Users, color: "text-orange-500" },
  { icon: StickyNote, color: "text-yellow-500" },
];

export default function RightSidebar() {
  return (
    <aside className="w-16 border-l border-gray-200 bg-white flex flex-col items-center py-4">

      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <button
            key={index}
            className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center mb-3 transition"
          >
            <Icon
              size={22}
              className={item.color}
            />
          </button>
        );
      })}

      <div className="flex-1" />

      <button className="w-12 h-12 rounded-full hover:bg-gray-100 flex items-center justify-center">
        <Plus size={22} />
      </button>

    </aside>
  );
}