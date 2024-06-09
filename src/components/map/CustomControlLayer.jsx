import  { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import CustomLayerControl from './CustomLayerControl';
import { baseMaps, overlayMaps } from './baseMaps';

const CustomControlLayer = () => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        // Inisialisasi peta
        if (!mapRef.current) return;

        const mapInstance = L.map(mapRef.current).setView([51.505, -0.09], 13); // Sesuaikan koordinat awal dan zoom level
        setMap(mapInstance);

        // Menambahkan layer default (opsional, bisa diletakkan di CustomLayerControl juga)
        const defaultLayer = baseMaps[0].layer;
        defaultLayer.addTo(mapInstance);

    }, []);

    return (
        <div className="relative h-full">
            <div ref={mapRef} className="h-full" />
            {map && <CustomLayerControl map={map} baseMaps={baseMaps} overlayMaps={overlayMaps} />}
        </div>
    );
};

export default CustomControlLayer;
