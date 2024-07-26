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

const fetchPrediction = async (region, coords) => {
    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Region: region, coords: coords }),
        });
        const result = await response.json();

        if (result.status === 'success') {
            const { DEM, TPI, NDVI, NDWI, decision } = result.data;
            return { DEM, TPI, NDVI, NDWI, decision };
        } else {
            console.error('API request failed:', result.message);
        }
    } catch (error) {
        console.error('Error fetching prediction:', error);
    }
};


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
        }
    } catch (error) {
        console.error('Error fetching water canal data:', error);
    }
};

const createPredictionPopupHTML = ({ DEM, TPI, NDVI, NDWI, decision }) => {
    return `
        <div class="p-4 bg-white rounded-lg shadow-md">
            <h2 class="text-lg font-bold mb-2">Prediction Details</h2>
            <ul class="list-disc pl-5">
                <li class="mb-2">
                    <span class="font-semibold">DEM:</span> ${ DEM }
                </li>
                <li class="mb-2">
                    <span class="font-semibold">TPI:</span> ${ TPI }
                </li>
                <li class="mb-2">
                    <span class="font-semibold">NDVI:</span> ${ NDVI }
                </li>
                <li class="mb-2">
                    <span class="font-semibold">NDWI:</span> ${ NDWI }
                </li>
                <li class="mb-2">
                    <span class="font-semibold">Decision:</span> ${ decision }
                </li>
            </ul>
        </div>
    `;
};


const fetchHistoryData = async () => {
    try {
        const response = await fetch('/histori');
        const result = await response.json();
        if (result.success) {
            useMapStore.getState().setHistoryData(result);
            console.log(result)
        }
    } catch (error) {
        console.error('Error fetching history data:', error);
    }
};


const MapComponent = () => {
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const map = useMapStore((state) => state.map);
    // const waterCanalLayer = useMapStore((state) => state.waterCanalLayer);
    const basemaps = useMapStore((state) => state.basemaps);
    const markerPredictionLayer = useMapStore((state) => state.markerPredictionLayer);
    const setMarkerPredictionLayer = useMapStore((state) => state.setMarkerPredictionLayer);
    const deleteMarkerPredictionLayer = useMapStore((state) => state.deleteMarkerPredictionLayer);
    useEffect(() => {
        fetchWaterCanalData();
        fetchHistoryData();
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
            if (markerPredictionLayer && !map.hasLayer(markerPredictionLayer)) {
                markerPredictionLayer.addTo(map);
            }
        }
    }, [map, activeBasemap, basemaps, markerPredictionLayer]);

    const onCreated = async (e) => {
        const { layerType, layer } = e;
        const markerPredictionLayer = useMapStore.getState().markerPredictionLayer;
        const map = useMapStore.getState().map;

        if (layerType === 'marker') {
            // Hapus marker sebelumnya jika ada
            if (markerPredictionLayer) {
                map.removeLayer(markerPredictionLayer);
                useMapStore.getState().deleteMarkerPredictionLayer();
            }
            const { lat, lng } = layer.getLatLng();
            const coords = `${ lng }, ${ lat }`;  // Format untuk pengiriman ke API
            const predictions = await fetchPrediction('Indonesia', coords);

            if (predictions) {
                const { DEM, TPI, NDVI, NDWI, decision } = predictions;
                const popupHTML = createPredictionPopupHTML({ DEM, TPI, NDVI, NDWI, decision });
                layer.bindPopup(popupHTML).openPopup();
                // Simpan marker baru di global state
                // useMapStore.getState().setMarkerPredictionLayer(layer);
                setMarkerPredictionLayer(layer)
            }
        } else {
            console.log(`Layer created: ${ layerType }`);
        }
    };


    const onDeleted = (e) => {
        const layers = e.layers;
        layers.eachLayer((layer) => {
            if (layer === markerPredictionLayer) {
                deleteMarkerPredictionLayer();
            }
        });
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
                        onDeleted={onDeleted}
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
