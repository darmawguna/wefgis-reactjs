import { useEffect } from 'react';
import L from 'leaflet';
import { useMapStore, usePopupMarkerStore } from '../../store/MapStore';
import sensorblack from '../../assets/sensorblack.png';


const useSensorLayerInitialization = () => {
    const sensors = useMapStore((state) => state.sensor);
    const sensorLayer = useMapStore((state) => state.sensorLayer);
    const setSensorLayer = useMapStore((state) => state.setSensorLayer);
    const addLayer = useMapStore((state) => state.addLayer);
    const setSelectedSensor = useMapStore((state) => state.setSelectedSensor);
    const setMarkerOpen = usePopupMarkerStore((state) => state.setOpenMarker);


    const handleClick = (sensor) => {
        setMarkerOpen(true);
        setSelectedSensor(sensor)
        
    }



    useEffect(() => {
        const initializeSensorLayer = () => {
            if (sensors && sensors.length > 0 && !sensorLayer) {
                const markers = L.layerGroup(
                    sensors.map(sensor => {
                        const customIcon = L.icon({
                            iconUrl: sensorblack,
                            iconSize: [36, 36], // Sesuaikan dengan ukuran gambar marker Anda
                            popupAnchor: [0, -10] // Sesuaikan posisi popup jika diperlukan
                        });
                        // TODO cari tau cara agar ketika di click sidebar Marker tidak tertutup dan hanya mengganti data
                        const marker = L.marker([parseFloat(sensor.latitude), parseFloat(sensor.longitude)], { icon: customIcon })
                            // .bindPopup(`<b>${ sensor.id }</b><br>${ sensor.description }`)
                            .on('click', () => {
                                // setSelectedSensor(sensor); // Set sensor yang dipilih
                                // setMarkerOpen(true);
                                handleClick(sensor);
                            });

                        let polygon = null;
                        if (sensor.polygon) {
                            polygon = L.polygon(sensor.polygon.map(coord => [parseFloat(coord.lat), parseFloat(coord.lng)]))

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
