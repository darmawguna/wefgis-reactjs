import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
// import ReportCard from './CardWarning';
import SidebarController from '../layouts/map/SideBarMapController';
import SidebarIcons from '../layouts/map/SidebarIcon';
import { useMapStore } from '../store/MapStore';
import useWaterCanalLayerInitialization from './custom-hooks/WaterCanalHooks';


const indonesiaCoords = [-0.7893, 113.9213]; // Center of Indonesia

// const hazardData = [
//     { title: 'Alert', jumlahProvinsi: 15, jumlahKabupaten: 55, jumlahKecamatan: 200 },
//     { title: 'Standby', jumlahProvinsi: 3, jumlahKabupaten: 6, jumlahKecamatan: 9 },
//     { title: 'Danger', jumlahProvinsi: 0, jumlahKabupaten: 0, jumlahKecamatan: 0 },
// ];

const MapInstanceProvider = () => {
    const map = useMap();
    const setMap = useMapStore((state) => state.setMap);

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);

    return null;
};

const fetchWaterCanalData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/water', {
            // headers: {
            //     'Authorization': `Bearer ${ token }`,
            //     'Content-Type': 'application/json'
            // }
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
    // const waterCanalLayer = useMapStore((state) => state.waterCanalLayer);
    const basemaps = useMapStore((state) => state.basemaps); 

    useEffect(() => {
        fetchWaterCanalData();
    }, []);
    useWaterCanalLayerInitialization();

    useEffect(() => {
        if (map && activeBasemap) {
            // Remove all existing basemap layers if they exist on the map
            basemaps.forEach(basemap => {
                if (map.hasLayer(basemap.layer)) {
                    map.removeLayer(basemap.layer);
                }
            });
            // Add the active basemap layer to the map
            if (!map.hasLayer(activeBasemap.layer)) {
                activeBasemap.layer.addTo(map);
            }
            // Add back the water canal layer to the map
            // if (!map.hasLayer(waterCanalLayer)) {
            //     waterCanalLayer.addTo(map);
            // }
        }
    }, [map, activeBasemap]);

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
            {/* <div className="absolute bottom-0 left-0 w-full z-10 flex justify-around items-end">
                <div className="p-3 gap-3 flex w-full justify-around">
                    {hazardData.map((hazard) => (
                        <ReportCard key={hazard.title} {...hazard} />
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default MapComponent;
