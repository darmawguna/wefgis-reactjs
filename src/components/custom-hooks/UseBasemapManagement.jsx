import { useEffect } from 'react';
import { useMapStore } from '../../store/MapStore';


const useBasemapManagement = () => {
    const map = useMapStore((state) => state.map);
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const basemaps = useMapStore((state) => state.basemaps);

    useEffect(() => {
        const manageBasemapLayers = () => {
            if (!map || !activeBasemap) {
                // console.warn('Map or active basemap is not defined');
                return;
            }

            try {
                // Remove old basemap layers
                basemaps.forEach(basemap => {
                    if (map.hasLayer(basemap.layer)) {
                        // console.log('Removing Basemap Layer:', basemap.layer);
                        map.removeLayer(basemap.layer);
                    }
                });

                // Add the active basemap layer if not already present
                if (!map.hasLayer(activeBasemap.layer)) {
                    // console.log('Adding Active Basemap Layer:', activeBasemap.layer);
                    activeBasemap.layer.addTo(map);
                }
            } catch (error) {
                console.error('Error managing basemap layers:', error);
            }
        };

        manageBasemapLayers();
    }, [map, activeBasemap, basemaps]);
};

export default useBasemapManagement;
