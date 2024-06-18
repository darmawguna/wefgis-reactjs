import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import ReportCard from './CardWarning';
import SidebarController from '../layouts/map/SideBarMapController';
import SidebarIcons from '../layouts/map/SidebarIcon';
import { useEffect, useRef } from 'react';
import { useMapStore } from '../store/MapStore'; // Import useMapStore from Zustand store
import { baseMaps } from '../utils/basemap';

const indonesiaCoords = [-0.7893, 113.9213]; // Center of Indonesia

const hazardData = [
    { title: 'Waspada', jumlahProvinsi: 15, jumlahKabupaten: 55, jumlahKecamatan: 200 },
    { title: 'Siaga', jumlahProvinsi: 3, jumlahKabupaten: 6, jumlahKecamatan: 9 },
    { title: 'Awas', jumlahProvinsi: 0, jumlahKabupaten: 0, jumlahKecamatan: 0 },
];

const MapInstanceProvider = () => {
    const map = useMap();
    const setMap = useMapStore((state) => state.setMap);

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);

    return null;
};

const MapComponent = () => {
    const addLayer = useMapStore((state) => state.addLayer);
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const map = useMapStore((state) => state.map);
    const markerLayerRef = useRef(null); // Gunakan useRef untuk markerLayer

    useEffect(() => {
        // Initialize marker layer when component mounts
        const markers = L.layerGroup([
            L.marker([51.5, -0.09]),
            L.marker([51.51, -0.1])
        ]);
        markerLayerRef.current = markers; // Simpan di useRef
        addLayer(markers); // Tambahkan marker layer ke layers array di state global

        return () => {
            // Clean up marker layer when component unmounts
            if (markerLayerRef.current) {
                markerLayerRef.current.remove();
            }
        };
    }, [addLayer]);

    useEffect(() => {
        if (map && activeBasemap && markerLayerRef.current) {
            // Remove all existing basemap layers
            baseMaps.forEach(basemap => {
                map.removeLayer(basemap.layer);
            });

            // Add the active basemap layer to the map
            activeBasemap.layer.addTo(map);

            // Add back the marker layer if it exists
            markerLayerRef.current.addTo(map);
        }
    }, [map, activeBasemap]);

    return (
        <div className="h-full w-full relative" style={{ zIndex: '0' }}>
            <MapContainer center={indonesiaCoords} zoom={6} style={{ height: '100%', width: '100%', zIndex: '0' }}>
                <MapInstanceProvider />

                {activeBasemap && (
                    <TileLayer
                        attribution={activeBasemap.layer.options.attribution}
                        url={activeBasemap.layer._url}
                    />
                )}


            </MapContainer>
            <div className='absolute top-16 right-0 z-50 mr-2'>
                <SidebarIcons />
                <SidebarController />
            </div>

            <div className="absolute bottom-0 left-0 w-full z-10 flex justify-around items-end">
                <div className="p-3 gap-3 flex w-full justify-around">
                    {hazardData.map((hazard) => (
                        <ReportCard key={hazard.title} {...hazard} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
