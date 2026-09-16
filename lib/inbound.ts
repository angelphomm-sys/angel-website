// Where an inquiry came from. Used by the contact form, the email subject, and the stats page.
export const sources = [
  { id: "linkedin", label: "LinkedIn" },
  { id: "instagram", label: "Instagram" },
  { id: "referral", label: "someone sent me" },
  { id: "search", label: "search" },
  { id: "other", label: "somewhere else" },
] as const;
