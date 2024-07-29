import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  isOpen: false,
  content: "User Management",
  setContent: (content) => set({ content }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));
