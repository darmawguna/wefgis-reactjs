import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import ReportCard from './CardWarning';
import SidebarController from '../layouts/map/SideBarMapController';
import SidebarIcons from '../layouts/map/SidebarIcon';
import { useMapStore } from '../store/MapStore'; // Import useMapStore from Zustand store
import { baseMaps } from '../utils/basemap';
import { token } from '../utils/token';
import useWaterCanalLayerInitialization from './custom-hooks/WaterCanalHooks';
// import useFetchWaterCanalData from './custom-hooks/WaterFetchHooks';

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

const fetchWaterCanalData = async () => {
    // const waterCanal = useMapStore((state) => state.waterCanal);
    try {
        const response = await fetch('http://127.0.0.1:8000/api/water', {
            headers: {
                'Authorization': `Bearer ${ token }`,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.success) {
            useMapStore.getState().setWaterCanal(result.data);
            console.log(result.data);
        }
    } catch (error) {
        console.error('Error fetching water canal data:', error);
    }
};

const MapComponent = () => {
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const map = useMapStore((state) => state.map);
    const waterCanalLayer = useMapStore((state) => state.waterCanalLayer);
    // const waterCanal = useMapStore((state) => state.waterCanal);

    useEffect(() => {
        fetchWaterCanalData();
    }, []);
    // useFetchWaterCanalData();

    // useEffect(() => {
    //     console.log(waterCanal);
    // }, [waterCanal]);

    useWaterCanalLayerInitialization();

    useEffect(() => {
        if (map && activeBasemap && waterCanalLayer) {
            // Remove all existing basemap layers
            baseMaps.forEach(basemap => {
                map.removeLayer(basemap.layer);
            });

            // Add the active basemap layer to the map
            activeBasemap.layer.addTo(map);

            // Add back the water canal layer to the map
            waterCanalLayer.addTo(map);
        }
    }, [map, activeBasemap, waterCanalLayer]);


    const onCreated = (e) => {
        const { layerType, layer } = e;
        if (layerType === 'marker') {
            const { lat, lng } = layer.getLatLng();
            console.log(`Marker created at [${ lat }, ${ lng }]`);
        } else {
            console.log(`Layer created: ${ layerType }`);
        }
    };

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

                {/* Drawer untuk membuat sebuah polygon */}
                <FeatureGroup>
                    <EditControl
                        position="topleft"
                        onCreated={onCreated}
                        draw={{
                            rectangle: false,
                            circle: false,
                            circlemarker: false
                        }}
                    />
                </FeatureGroup>
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
