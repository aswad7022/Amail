import { create } from "zustand";

import type { Conversation } from "../models/conversation";
import type { Mail } from "../models/mail";

interface MailStore {
  conversations: Conversation[];
  allConversations: Conversation[];
  selectedConversation: Conversation | null;
  selectedMail: Mail | null;
  search: string; // إضافة حالة البحث داخل الـ interface
  setConversations: (conversations: Conversation[]) => void;
  addConversation: (conversation: Conversation) => void;
  openConversation: (conversation: Conversation) => void;

  replyToConversation: (
    conversationId: string,
    mail: Mail
  ) => void;

  filterCategory: (
    category: "primary" | "social" | "promotions" | "updates"
  ) => void;

  selectConversation: (id: string) => void;
  setSearch: (search: string) => void; // إضافة الـ Action داخل الـ interface
}

export const useMailStore = create<MailStore>((set, get) => ({
  conversations: [],
  allConversations: [],
  selectedConversation: null,
  selectedMail: null,
  search: "", // إضافة القيمة الابتدائية للبحث داخل الـ store

  setConversations: (conversations) =>
    set({
      conversations,
      allConversations: conversations,
      selectedConversation: conversations[0] ?? null,
      selectedMail: conversations[0]?.messages.at(-1) ?? null,
    }),

  addConversation: (conversation) =>
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      allConversations: [conversation, ...state.allConversations],
      selectedConversation: conversation,
      selectedMail: conversation.messages.at(-1) ?? null,
    })),

  openConversation: (conversation) =>
    set({
      selectedConversation: conversation,
      selectedMail: conversation.messages.at(-1) ?? null,
    }),

  replyToConversation: (conversationId, mail) =>
    set((state) => {
      const conversations = state.conversations.map((conversation) => {
        if (conversation.id !== conversationId) {
          return conversation;
        }

        return {
          ...conversation,
          preview: mail.preview,
          time: mail.time,
          unread: false,
          messages: [...conversation.messages, mail],
        };
      });

      const current =
        conversations.find((c) => c.id === conversationId) ?? null;

      return {
        conversations,
        allConversations: conversations,
        selectedConversation: current,
        selectedMail: current?.messages.at(-1) ?? null,
      };
    }),

  filterCategory: (category) => {
    const filtered = get().allConversations.filter(
      (c) => c.category === category
    );

    set({
      conversations: filtered,
      selectedConversation: filtered[0] ?? null,
      selectedMail: filtered[0]?.messages.at(-1) ?? null,
    });
  },

  selectConversation: (id) => {
    const conversation = get().conversations.find((c) => c.id === id) ?? null;

    set({
      selectedConversation: conversation,
      selectedMail: conversation?.messages.at(-1) ?? null,
    });
  },

  // إضافة الـ Action لتحديث حالة البحث
  setSearch: (search) =>
    set({
      search,
    }),
}));