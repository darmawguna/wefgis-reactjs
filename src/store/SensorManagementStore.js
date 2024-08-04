import { create } from "zustand";

const SensorManagementStore = create((set) => ({
  sensors: [],
  setUser: (user) => set({ user }),
  totalItems: 0,
  currentPage: 1,
  totalPages: 1,
  isAddingSensor: false,
  setIsAddingSensor: (isAddingSensor) => set({ isAddingSensor }),
  isEditingSensor: false,
  setIsEditingSensor: (isEditingSensor) => set({ isEditingSensor }),
  isDetailSensor: true,
  setIsDetailSensor: (isDetailSensor) => set({ isDetailSensor }),
  fetchSensors: async (page = 1) => {
    try {
      const response = await fetch(`http://localhost:3000/sensors?page=${page}`);
      const data = await response.json();

      const sensorsData = data.data || {};
      // console.log(sensorsData);

      set({
        sensors: sensorsData.sensors || [],
        totalItems: sensorsData.totalItems || 0,
        currentPage: sensorsData.currentPage || 1,
        totalPages: sensorsData.totalPages || 1,
      });
    } catch (error) {
      console.error("Failed to fetch sensors:", error);
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

export default SensorManagementStore;
