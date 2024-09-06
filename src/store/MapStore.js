import { create } from "zustand";
import { baseMaps } from "../utils/basemap";
import L from "leaflet";

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

export const usePopupMarkerStore = create((set) => ({
  // TODO cari cara agar logika sidebar dapat muncul terus ketika berganti marker yang di click
  isOpenMarker: false,
  setOpenMarker: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useMapStore = create((set) => ({
  // state untuk menyimpan layer yang ada
  layers: [
    // Contoh inisialisasi awal layer
    {
      name: "Markers",
      layer: L.layerGroup([L.marker([-8.517260599107024, 115.40790383695385]), L.marker([-8.493741092156219, 115.44753893468388])]),
    },
  ],
  addLayer: (name, layer) =>
    set((state) => ({
      layers: [...state.layers, { name, layer }],
    })),
  removeLayer: (name) =>
    set((state) => ({
      layers: state.layers.filter((l) => l.name !== name),
    })),
  // State untuk menyimpan active layer
  activeLayers: [],
  setActiveLayers: (layers) => set({ activeLayers: layers }),
  addActiveLayer: (layer) =>
    set((state) => ({
      activeLayers: [...state.activeLayers, layer],
    })),
  removeActiveLayer: (layerToRemove) =>
    set((state) => ({
      activeLayers: state.activeLayers.filter((layer) => layer !== layerToRemove),
    })),
  resetLayers: () => set({ layers: [] }),
  // State untuk menyimpan basemaps
  basemaps: baseMaps,
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

  sensor: [],
  setSensor: (data) => set({ sensor: data }),

  selectedSensor: null,
  setSelectedSensor: (sensor) => set({ selectedSensor: sensor }),

  sensorLayer: null,
  setSensorLayer: (layer) => set({ sensorLayer: layer }),

  historyData: [], // Add this line
  setHistoryData: (data) => set({ historyData: data }), // Add this line
}));


