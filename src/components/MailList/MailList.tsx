import {

  Star,

  Paperclip,

  Archive,

  Trash2,

  MailOpen,

} from "lucide-react";



import { useNavigate, useParams } from "react-router-dom";

import { useMailStore } from "../../store/mailStore";



function formatDate(date: Date) {

  const now = new Date();



  if (date.toDateString() === now.toDateString()) {

    return date.toLocaleTimeString("en-US", {

      hour: "2-digit",

      minute: "2-digit",

    });

  }



  return date.toLocaleDateString("en-GB", {

    day: "2-digit",

    month: "short",

  });

}



export default function MailList() {

  const navigate = useNavigate();

  const { id: currentRouteId } = useParams();



  // جلب المحادثات، وظيفة التحديد، وقيمة البحث من الـ Store

  const { conversations, selectConversation, search } = useMailStore();



  // فلترة المحادثات بناءً على قيمة البحث المدخلة

  const filteredConversations = conversations.filter((conversation) => {

    const q = search.toLowerCase();



    return (

      conversation.sender.toLowerCase().includes(q) ||

      conversation.subject.toLowerCase().includes(q) ||

      conversation.preview.toLowerCase().includes(q) ||

      conversation.messages.some((m) =>

        m.body.toLowerCase().includes(q)

      )

    );

  });



  return (

    <div className="flex-1 overflow-y-auto bg-white">

      {/* رندرة القائمة المفلترة الجديدة بدلاً من القائمة الكاملة */}

      {filteredConversations.map((conversation) => {

        const isSelected = conversation.id === currentRouteId;



        return (

          <div

            key={conversation.id}

            onClick={() => {

              selectConversation(conversation.id);

              navigate(`/mail/${conversation.id}`);

            }}

            className={`group relative flex items-center rounded-lg border-b border-[#f1f3f4] px-4 py-[11px] cursor-pointer text-sm transition-all duration-150 hover:mx-2 hover:my-[2px] hover:z-10 hover:-translate-y-[1px] hover:border hover:border-[#dadce0] hover:shadow-[0_1px_3px_rgba(60,64,67,.3),0_4px_8px_3px_rgba(60,64,67,.15)] ${

              isSelected

                ? "bg-[#f2f6fc] hover:bg-[#e8f0fe]"

                : "bg-white hover:bg-white"

            }`}

          >

            {/* التحديث الجديد للـ Checkbox وحاويته */}

            <div className="relative w-10 flex justify-center">

              <input

                type="checkbox"

                className="cursor-pointer accent-blue-600 opacity-0 transition-all duration-150 group-hover:opacity-100"

                onClick={(e) => e.stopPropagation()}

              />

            </div>



            <div className="w-10 flex justify-center">

              <Star

                size={16}

                className={`cursor-pointer transition-all duration-150 hover:scale-110 ${

                  conversation.starred

                    ? "fill-yellow-400 text-yellow-400"

                    : "text-gray-400 hover:text-gray-600"

                }`}

              />

            </div>



            <div className="w-2" />



            <div

              className={`w-[190px] truncate ${

                conversation.unread

                  ? "font-bold text-gray-900"

                  : "font-medium text-gray-800"

              }`}

            >

              {conversation.subject === "Request for Refund Status and Transaction Inquiry"

                ? "MoneyGram"

                : conversation.sender}

            </div>



            <div className="flex-1 truncate text-[14px]">

              <span

                className={

                  conversation.unread

                    ? "font-bold text-gray-900"

                    : "text-gray-800"

                }

              >

                {conversation.subject}

              </span>



              <span className="text-gray-500 font-normal">

                {" — "}

                {conversation.preview}

              </span>

            </div>



            <div className="w-8 flex justify-center">

              {conversation.hasAttachment && (

                <Paperclip

                  size={14}

                  className="text-gray-400 transition-colors duration-150 group-hover:text-gray-600"

                />

              )}

            </div>



            <div className="w-[110px] relative flex justify-end items-center pr-2">

              <span

                className={`text-right text-xs transition-all duration-150 group-hover:opacity-0 group-hover:translate-x-2 ${

                  conversation.unread

                    ? "font-bold text-gray-900"

                    : "font-medium text-gray-500"

                }`}

              >

                {formatDate(conversation.messages.at(-1)!.date)}

              </span>



              <div

                className={`absolute right-2 flex items-center gap-1 text-gray-500 opacity-0 translate-x-2 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto ${

                  isSelected ? "bg-[#e8f0fe]" : "bg-white"

                }`}

              >

                <Archive

                  size={17}

                  className="p-1 rounded-full cursor-pointer transition-all duration-150 hover:scale-110 hover:bg-[#f1f3f4] hover:text-gray-900"

                />

                <Trash2

                  size={17}

                  className="p-1 rounded-full cursor-pointer transition-all duration-150 hover:scale-110 hover:bg-[#f1f3f4] hover:text-red-600"

                />

                <MailOpen

                  size={17}

                  className="p-1 rounded-full cursor-pointer transition-all duration-150 hover:scale-110 hover:bg-[#f1f3f4] hover:text-gray-900"

                />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

} 