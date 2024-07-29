// UserManagementStore.js
import { create } from "zustand";

const UserManagementStore = create((set) => ({
  users: [
    {
      user_id: 2,
      name: "Arya Wiguna",
      email: "darmawiguna@gmail.com",
      phone_number: "086557655",
      role: "user",
      location: "jalan sahadewa",
      latitude: 13.6541,
      longitude: 100.495,
    },
  ],
  setUser: (user) => set({ user }),
  totalItems: 0,
  currentPage: 1,
  totalPages: 1,
  fetchUsers: async () => {
    try {
      const response = await fetch("http://localhost:3000/users"); // Ganti dengan URL API Anda
      const data = await response.json();

      const usersData = data.data || {}; // Pastikan data.data ada
      console.log(usersData.currentPage);

      set({
        users: usersData.users || [],
        totalItems: usersData.totalItems || 0,
        currentPage: usersData.currentPage || 1,
        totalPages: usersData.totalPages || 1,
      });
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  },
  setCurrentPage: (page) =>
    set((state) => {
      if (page >= 1 && page <= state.totalPages) {
        return { currentPage: page };
      }
      return state; // Kembalikan state jika page tidak valid
    }),
}));

export default UserManagementStore;
