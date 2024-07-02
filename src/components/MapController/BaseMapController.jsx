import { useEffect } from 'react';
import { useMapStore } from '../../store/MapStore';

const BasemapController = () => {
    const activeBasemap = useMapStore((state) => state.activeBasemap);
    const setActiveBasemap = useMapStore((state) => state.setActiveBasemap);
    const map = useMapStore((state) => state.map);
    const activeLayers = useMapStore((state) => state.activeLayers);
    const basemaps = useMapStore((state) => state.basemaps);

    useEffect(() => {
        if (map && activeBasemap && activeBasemap.layer) {
            activeBasemap.layer.addTo(map);

            activeLayers.forEach(layer => {
                if (!map.hasLayer(layer.layer)) {
                    layer.layer.addTo(map);
                }
            });

            return () => {
                map.eachLayer(layer => {
                    if (layer !== activeBasemap.layer) {
                        map.removeLayer(layer);
                    }
                });
            };
        }
    }, [activeBasemap, map, activeLayers]);

    const handleBasemapChange = (newLayer) => {
        if (map) {
            setActiveBasemap({ layer: newLayer });
            map.eachLayer(layer => {
                if (layer !== newLayer && !activeLayers.some(l => l.layer === layer)) {
                    map.removeLayer(layer);
                }
            });

            newLayer.addTo(map);

            activeLayers.forEach(layer => {
                if (!map.hasLayer(layer.layer)) {
                    layer.layer.addTo(map);
                }
            });
        }
    };

    return (
        <div>
            {basemaps.map((basemap, index) => (
                <div key={index} className="flex items-center my-2">
                    <input
                        type="radio"
                        id={`basemap-${ index }`}
                        name="basemap"
                        className="mr-2"
                        checked={activeBasemap?.layer === basemap.layer}
                        onChange={() => handleBasemapChange(basemap.layer)}
                    />
                    <label htmlFor={`basemap-${ index }`} className="flex items-center">
                        <img src={basemap.imageUrl} alt={basemap.name} className="w-16 h-16 object-cover mr-2" />
                        <span>{basemap.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default BasemapController;
