import { useEffect } from 'react';
import L from 'leaflet';
import { useMapStore } from '../../store/MapStore';
import sensorblack from '../../assets/sensorblack.png';

const useSensorLayerInitialization = () => {
    const sensors = useMapStore((state) => state.sensor);
    const sensorLayer = useMapStore((state) => state.sensorLayer);
    const setSensorLayer = useMapStore((state) => state.setSensorLayer);
    const addLayer = useMapStore((state) => state.addLayer);

    useEffect(() => {
        const initializeSensorLayer = () => {
            if (sensors && sensors.length > 0 && !sensorLayer) {
                const markers = L.layerGroup(
                    sensors.map(sensor => {
                        console.log(sensor)
                        const customIcon = L.icon({
                            iconUrl: sensorblack,
                            iconSize: [36, 36], // Sesuaikan dengan ukuran gambar marker Anda
                            popupAnchor: [0, -10] // Sesuaikan posisi popup jika diperlukan
                        });
                        const marker = L.marker([parseFloat(sensor.latitude), parseFloat(sensor.longitude)], { icon: customIcon })
                            .bindPopup(`<b>${ sensor.id }</b><br>${ sensor.description }`);

                        let polygon = null;
                        if (sensor.polygon) {
                            polygon = L.polygon(sensor.polygon.map(coord => [parseFloat(coord.lat), parseFloat(coord.lng)]))
                                .bindPopup(`<b>${ sensor.name }</b><br>${ sensor.description }`);
                        }

                        return polygon ? [marker, polygon] : [marker];
                    }).flat()
                );

                if (sensorLayer) {
                    sensorLayer.clearLayers(); // Menghapus layer yang ada jika ada
                }

                setSensorLayer(markers);
                addLayer("sensor", markers); // Tambahkan ke layer global
                
            }
        };

        initializeSensorLayer();
    }, [sensors, sensorLayer, setSensorLayer, addLayer]);

    return null;
};

export default useSensorLayerInitialization;
