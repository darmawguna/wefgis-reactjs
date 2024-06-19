import { useEffect } from 'react';
import L from 'leaflet';
import { useMapStore } from '../../store/MapStore';
import WaterCanalMarker from '../../assets/waterCanalMarker.png'

const useWaterCanalLayerInitialization = () => {
    const waterCanal = useMapStore((state) => state.waterCanal);
    const waterCanalLayer = useMapStore((state) => state.waterCanalLayer);
    const setWaterCanalLayer = useMapStore((state) => state.setWaterCanalLayer);
    const addLayer = useMapStore((state) => state.addLayer);

    useEffect(() => {
        const initializeWaterCanalLayer = () => {
            if (waterCanal && waterCanal.length > 0 && !waterCanalLayer) {
                console.log('data water canal:', waterCanal);
                const markers = L.layerGroup(
                    waterCanal.map(canal => {
                        const customIcon = L.icon({
                            iconUrl: WaterCanalMarker,
                            iconSize: [32, 32], // Sesuaikan dengan ukuran gambar marker Anda
                            popupAnchor: [0, -10] // Sesuaikan posisi popup jika diperlukan
                        });
                        const marker = L.marker([parseFloat(canal.latitude), parseFloat(canal.longitude)], { icon: customIcon })
                            .bindPopup(`<b>${ canal.name }</b><br>${ canal.description }`);

                        let polygon = null;
                        if (canal.polygon) {
                            polygon = L.polygon(canal.polygon.map(coord => [parseFloat(coord.lat), parseFloat(coord.lng)]))
                                .bindPopup(`<b>${ canal.name }</b><br>${ canal.description }`);
                        }

                        return polygon ? [marker, polygon] : [marker];
                    }).flat()
                );

                if (waterCanalLayer) {
                    waterCanalLayer.clearLayers(); // Remove existing layers if any
                }

                setWaterCanalLayer(markers);
                addLayer(markers); // Add to global state layers
            }
        };

        initializeWaterCanalLayer();
    }, [waterCanal, waterCanalLayer, setWaterCanalLayer, addLayer]);


    return null;
};

export default useWaterCanalLayerInitialization;
