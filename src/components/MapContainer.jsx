import { useEffect, } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SidebarController from '../layouts/map/SideBarMapController';
import SidebarIcons from '../layouts/map/SidebarIcon';
import { useMapStore } from '../store/MapStore';
import useWaterCanalLayerInitialization from './custom-hooks/WaterCanalHooks';
import useDeviceTypeState from './custom-hooks/DeviceTypeHooks';

const indonesiaCoords = [-0.7893, 113.9213];

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
    const map = useMapStore((state) => state.map);
    const basemaps = useMapStore((state) => state.basemaps);
    // const zoomEnabled = useZoomControlState();
    const { zoomEnabled, isMobile } = useDeviceTypeState();
    console.log('isMobile', isMobile);

    useWaterCanalLayerInitialization();

    useEffect(() => {
        if (map && activeBasemap) {
            basemaps.forEach(basemap => {
                if (map.hasLayer(basemap.layer)) {
                    map.removeLayer(basemap.layer);
                }
            });
            if (!map.hasLayer(activeBasemap.layer)) {
                activeBasemap.layer.addTo(map);
            }
        }
    }, [map, activeBasemap, basemaps]);

    return (
        <div className="h-full w-full relative" style={{ zIndex: '0' }}>
            <MapContainer
                center={indonesiaCoords}
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
            </MapContainer>
            <div className='absolute top-16 right-0 z-50 mr-2'>
                <SidebarIcons />
                <SidebarController />
            </div>
        </div>
    );
};

export default MapComponent;
