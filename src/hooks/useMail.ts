import { useState } from "react";
import { mails } from "../data/mails";
import type { Mail } from "../types/mail";

export function useMail() {
  const [selectedMail, setSelectedMail] = useState<Mail | null>(null);

  return {
    mails,
    selectedMail,
    setSelectedMail,
  };
}