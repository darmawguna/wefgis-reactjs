import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SidebarController from '../layouts/map/SideBarMapController';
import SidebarIcons from '../layouts/map/SidebarIcon';
import { useMapStore } from '../store/MapStore';
import useWaterCanalLayerInitialization from './custom-hooks/WaterCanalHooks';

const indonesiaCoords = [-0.7893, 113.9213];

const MapInstanceProvider = () => {
    const map = useMap();
    const setMap = useMapStore((state) => state.setMap);

    useEffect(() => {
        setMap(map);
    }, [map, setMap]);
    return null;
};

const useZoomControlState = () => {
    const [zoomEnabled, setZoomEnabled] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => {
            setZoomEnabled(window.innerWidth >= 768); // True untuk desktop, false untuk mobile
        };

        handleResize(); // Set initial state
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return zoomEnabled;
};


const MapComponent = () => {
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const map = useMapStore((state) => state.map);
    const basemaps = useMapStore((state) => state.basemaps);
    const zoomEnabled = useZoomControlState();
    console.log('zoomEnabled', zoomEnabled);

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
                        attribution={activeBasemap.layer.options.attribution}
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
