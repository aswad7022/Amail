import { create } from "zustand";

import type { Conversation } from "../models/conversation";
import type { Mail } from "../models/mail";

interface MailStore {
  conversations: Conversation[];

  selectedConversation: Conversation | null;

  selectedMail: Mail | null;

  setConversations: (
    conversations: Conversation[]
  ) => void;

  selectConversation: (id: string) => void;
}

export const useMailStore = create<MailStore>(
  (set, get) => ({
    conversations: [],

    selectedConversation: null,

    selectedMail: null,

    setConversations: (conversations) =>
      set({
        conversations,
        selectedConversation:
          conversations[0] ?? null,
        selectedMail:
          conversations[0]?.messages[0] ?? null,
      }),

    selectConversation: (id) => {
      const conversation =
        get().conversations.find(
          (c) => c.id === id
        ) ?? null;

      set({
        selectedConversation: conversation,
        selectedMail:
          conversation?.messages[0] ?? null,
      });
    },
  })
);