import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isOpen: false,
  content: "",
  setOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setContent: (content) =>
    set((state) => {
      // If the same content is clicked again, toggle the sidebar
      if (state.content === content && state.isOpen) {
        return { isOpen: false, content: "" };
      } else {
        return { isOpen: true, content };
      }
    }),
}));
