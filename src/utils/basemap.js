import L from "leaflet";
import openstreetmap_de from "../../public/assets/icon-basemap/openstreetmap_de.png";
import googlestreets from "../../public/assets/icon-basemap/google-streets.png";
import googleearth from "../../public/assets/icon-basemap/google-earth.png";
import googlehibrid from "../../public/assets/icon-basemap/google-hibrid.png";

export const baseMaps = [
  {
    name: "OpenStreetMap",
    layer: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "©OpenStreetMap Contributors",
    }),
    imageUrl:  openstreetmap_de ,
  },
  {
    name: "Google Street Map",
    layer: L.tileLayer("http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
      attribution: "©Google StreetMap",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }),
    imageUrl:  googlestreets ,
  },
  {
    name: "Google Satellite Map",
    layer: L.tileLayer("https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      attribution: "©Google Satellite Map",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }),
    imageUrl:  googleearth ,
  },
  {
    name: "Google Hybrid Map",
    layer: L.tileLayer("http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}", {
      attribution: "©Google Hybrid Map",
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      maxZoom: 20,
    }),
    imageUrl:  googlehibrid ,
  },
  // Add more basemaps here (optional)
];
