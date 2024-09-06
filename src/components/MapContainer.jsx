import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SidebarController from '../layouts/map/SideBarMapController';
import SidebarIcons from '../layouts/map/SidebarIcon';
import { useMapStore, usePopupMarkerStore } from '../store/MapStore';
import useDeviceTypeState from './custom-hooks/DeviceTypeHooks';
import SidebarMarker from './map/Component/SidebarMarker';
// import useFetchSensorData from './custom-hooks/SensorFetchHooks';
import useSensorLayerInitialization from './custom-hooks/SensorHooks';
import useBasemapManagement from './custom-hooks/UseBasemapManagement';
import MobileSensorDetail from './map/Component/PopUpMarker';
import useWaterLevelData from './custom-hooks/useWaterLavel';
// TODO buat agar marker menggunakan animasi(pulse)

// const indonesiaCoords = [-0.7893, 113.9213];
const markerCoords = [-0.7893, 113.9213]; // Koordinat marker
const thailandCoords = [14.948479570848832, 100.7454193778767]

const MapInstanceProvider = () => {
    const map = useMap();
    const setMap = useMapStore((state) => state.setMap);

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);
    return null;
};




const MapComponent = () => {
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const { zoomEnabled, isMobile } = useDeviceTypeState();
    const setMarkerOpen = usePopupMarkerStore((state) => state.setOpenMarker)// State untuk mengelola sidebar
    // useFetchSensorData();
    useSensorLayerInitialization();
    useWaterLevelData();
    const handleMarkerClick = () => {
        setMarkerOpen(true); // Buka sidebar saat marker diklik
    };
    useBasemapManagement();
    return (
        <div className="h-full w-full relative" style={{ zIndex: '0' }}>
            <MapContainer
                center={thailandCoords}
                zoom={6}
                style={{ height: '100%', width: '100%', zIndex: '0' }}
                zoomControl={zoomEnabled} // Gunakan state untuk mengontrol visibilitas zoom control
            >
                <MapInstanceProvider />
                {activeBasemap && (
                    <TileLayer
                        attribution={activeBasemap.layer.attribution}
                        url={activeBasemap.layer._url}
                    />
                )}
                <Marker position={markerCoords} eventHandlers={{ click: handleMarkerClick }}>
                </Marker>
            </MapContainer>
            <div className='absolute top-20 right-0 z-50 mr-2'>
                <SidebarIcons />
                <SidebarController />
                {
                    isMobile ? (
                        <MobileSensorDetail />
                    ) : (
                        <SidebarMarker />
                    )
                }
            </div>
        </div>
    );
};

export default MapComponent;
