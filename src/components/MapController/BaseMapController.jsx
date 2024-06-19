import { useState, useEffect } from 'react';
import { baseMaps } from '../../utils/basemap';
import { useMapStore } from '../../store/MapStore';

const BasemapController = () => {
    const [activeBasemap, setActiveBasemap] = useState(baseMaps[0].layer);
    const map = useMapStore((state) => state.map);
    const layers = useMapStore((state) => state.layers);
    const resetLayers = useMapStore((state) => state.resetLayers);
    const waterCanalLayer = useMapStore((state) => state.waterCanalLayer); // New addition

    useEffect(() => {
        if (map) {
            activeBasemap.addTo(map);
            layers.forEach(layer => layer.addTo(map));

            if (waterCanalLayer) {
                waterCanalLayer.addTo(map); // Tambahkan kembali waterCanalLayer
            }
            return () => {
                map.eachLayer(layer => {
                    if (layer !== activeBasemap && !layers.includes(layer)) {
                        map.removeLayer(layer);
                    }
                });
            };
        }
    }, [activeBasemap, map, layers, waterCanalLayer]); // Add waterCanalLayer as dependency

    const handleBasemapChange = (layer) => {
        if (map) {
            map.eachLayer(layer => {
                if (layer !== activeBasemap && !layers.includes(layer)) {
                    map.removeLayer(layer);
                }
            });
            resetLayers();  // Reset the layers
            setActiveBasemap(layer);
            if (waterCanalLayer) {
                waterCanalLayer.addTo(map); // Tambahkan kembali waterCanalLayer setelah mengubah basemap
            }
        }
    };

    return (
        <div>
            {baseMaps.map((map, index) => (
                <div key={index} className="flex items-center my-2">
                    <input
                        type="radio"
                        id={`basemap-${ index }`}
                        name="basemap"
                        className="mr-2"
                        checked={activeBasemap === map.layer}
                        onChange={() => handleBasemapChange(map.layer)}
                    />
                    <label htmlFor={`basemap-${ index }`} className="flex items-center">
                        <img src={map.imageUrl} alt={map.name} className="w-16 h-16 object-cover mr-2" />
                        <span>{map.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );

};

export default BasemapController;
