import { useEffect } from 'react';
import { useMapStore } from '../../store/MapStore';

const LayerController = () => {
    const layers = useMapStore((state) => state.layers);
    const map = useMapStore((state) => state.map);
    const activeLayers = useMapStore((state) => state.activeLayers);
    const addActiveLayer = useMapStore((state) => state.addActiveLayer);
    const removeActiveLayer = useMapStore((state) => state.removeActiveLayer);
    const markerPredictionLayer = useMapStore((state) => state.markerPredictionLayer);

    useEffect(() => {
        if (map) {
            activeLayers.forEach(layer => {
                if (!map.hasLayer(layer.layer)) {
                    layer.layer.addTo(map);
                }
            });

            if (markerPredictionLayer && !map.hasLayer(markerPredictionLayer)) {
                markerPredictionLayer.addTo(map);
            }

        }
    }, [map, activeLayers]);

    const toggleLayer = (layer) => {
        if (map.hasLayer(layer.layer)) {
            map.removeLayer(layer.layer);
            removeActiveLayer(layer);
            // console.log(activeLayers.length);
        } else {
            // layer.layer.addTo(map);
            addActiveLayer(layer);
            // console.log(activeLayers.length);
        }
    };

    return (
        <div>
            {layers.map((layer, index) => (
                <div key={index} className="flex items-center my-2">
                    <input
                        type="checkbox"
                        id={`layer-${ index }`}
                        className="mr-2"
                        checked={activeLayers.some(activeLayer => activeLayer.name === layer.name)}
                        onChange={() => toggleLayer(layer)}
                    />
                    <label htmlFor={`layer-${ index }`}>
                        <span>{layer.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default LayerController;
