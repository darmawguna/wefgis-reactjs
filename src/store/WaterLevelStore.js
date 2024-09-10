import { create } from "zustand";

export const useWaterLevelStore = create((set) => ({
  dataPoints: {}, // Menyimpan data poin dari semua sensor
  setDataPoints: (sensorId, newPoint) =>
    set((state) => {
      const currentPoints = state.dataPoints[sensorId] || []; // Ambil dataPoints yang ada untuk sensor ini
      const updatedPoints = [...currentPoints, newPoint]; // Tambahkan point baru ke dataPoints yang ada

      return {
        dataPoints: {
          ...state.dataPoints,
          [sensorId]: updatedPoints.slice(-7), // Simpan hanya 7 data terbaru
        },
      };
    }),

  latestData: {}, // Menyimpan data terbaru dari setiap sensor
  setLatestData: (sensorId, data) =>
    set((state) => ({
      latestData: {
        ...state.latestData,
        [sensorId]: data,
      },
    })),
  connected: false,
  setConnected: (isConnected) => set(() => ({ connected: isConnected })),
}));
