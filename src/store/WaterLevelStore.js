import { create } from "zustand";

export const useWaterLevelStore = create((set) => ({
  dataPoints: {}, // Menyimpan data poin dari semua sensor
  setDataPoints: (sensorId, newPoints) =>
    set((state) => ({
      dataPoints: {
        ...state.dataPoints,
        [sensorId]: newPoints,
      },
    })),
  latestData: {}, // Menyimpan data terbaru dari setiap sensor
  setLatestData: (sensorId, data) =>
    set((state) => ({
      latestData: {
        ...state.latestData,
        [sensorId]: data,
      },
    })),
}));
