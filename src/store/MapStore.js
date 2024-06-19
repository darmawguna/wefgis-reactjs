import { create } from "zustand";
import { baseMaps } from "../utils/basemap";

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
  // map: null,
  // setMap: (map) => set({ map }),
}));

export const useMapStore = create((set) => ({
  layers: [],
  addLayer: (layer) => set((state) => ({ layers: [...state.layers, layer] })),
  removeLayer: (layer) => set((state) => ({ layers: state.layers.filter((l) => l !== layer) })),
  resetLayers: () => set({ layers: [] }),
  activeBasemap: baseMaps[0],
  setActiveBasemap: (basemap) => set({ activeBasemap: basemap }),
  map: null,
  setMap: (map) => set({ map }), // Add setMap function here
  // State untuk menyimpan data water canal dari api
  waterCanal: [],
  setWaterCanal: (data) => set({ waterCanal: data }),

  // state untuk menyimpan layergroup dari watercanal
  waterCanalLayer: null,
  setWaterCanalLayer: (layer) => set({ waterCanalLayer: layer }),
}));
