import { create } from "zustand";

const UserManagementStore = create((set) => ({
  users: [],
  setUser: (user) => set({ user }),
  totalItems: 0,
  currentPage: 1,
  totalPages: 1,
  //  const [isAddingUser, setIsAddingUser] = useState(false);
  // const [isEditingUser, setIsEditingUser] = useState(false);
  isAddingUser: false,
  setIsAddingUser: (isAddingUser) => set({ isAddingUser }),

  isEditingUser: false,
  setIsEditingUser: (isEditingUser) => set({ isEditingUser }),
  fetchUsers: async (page = 1) => {
    try {
      const response = await fetch(`http://api.fmews.wefgis.com/api/users?page=${page}`);
      // TODO ubah alamat api menjadi https://api.fmews.wefgis-sync.com/api/users?page=
      const data = await response.json();

      const usersData = data.data || {};

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
      return state;
    }),
}));

export default UserManagementStore;
