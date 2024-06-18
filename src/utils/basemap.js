import L from "leaflet";
export const overlayMaps = [
  {
    name: "Markers",
    layer: L.layerGroup([L.marker([51.5, -0.09]), L.marker([51.51, -0.1])]),
  },
  // Tambahkan overlay maps lainnya di sini
];

export const baseMaps = [
  {
    name: "OpenStreetMap",
    layer: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "©OpenStreetMap Contributors",
    }),
    imageUrl: "/public/assets/icon-basemap/openstreetmap_de.png",
  },
  {
    name: "Google Street Map",
    layer: L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
      attribution: "©Google StreetMap",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }),
    imageUrl: "/public/assets/icon-basemap/google-streets.png",
  },
  {
    name: "Google Satellite Map",
    layer: L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      attribution: "©Google Satellite Map",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }),
    imageUrl: "/public/assets/icon-basemap/google-earth.png",
  },
  {
    name: "Google Hybrid Map",
    layer: L.tileLayer("http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}", {
      attribution: "©Google Hybrid Map",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }),
    imageUrl: "/public/assets/icon-basemap/google-hibrid.png",
  },
  // Add more basemaps here (optional)
];
