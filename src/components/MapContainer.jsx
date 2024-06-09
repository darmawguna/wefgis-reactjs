import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ReportCard from './CardWarning'; // Assuming CardWarning.js is the correct path
// import { baseMaps } from '../utils/basemap';
import LayerGrid from './map/IconBasemap';


const indonesiaCoords = [-0.7893, 113.9213]; // Center of Indonesia
const indonesiaTileLayer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const hazardData = [
    { title: 'Waspada', jumlahProvinsi: 15, jumlahKabupaten: 55, jumlahKecamatan: 200 },
    { title: 'Siaga', jumlahProvinsi: 3, jumlahKabupaten: 6, jumlahKecamatan: 9 },
    { title: 'Awas', jumlahProvinsi: 0, jumlahKabupaten: 0, jumlahKecamatan: 0 },
];

const MapComponent = () => {
    
    return (
        <div className="h-full w-full relative" style={{ zIndex: '0' }}>
            <MapContainer center={indonesiaCoords} zoom={6} style={{ height: '100%', width: '100%', zIndex: '0' }} >
                

                <TileLayer url={indonesiaTileLayer} />
                <Marker position={indonesiaCoords}>
                    <Popup>Indonesia</Popup>
                </Marker>

            </MapContainer>
            {/* Add the custom layer control */}
            <LayerGrid />
           
            <div className="absolute bottom-0 left-0 w-full z-50 flex justify-around items-end">
                {/* Background for better visibility */}
                <div style={{ padding: '10px', display: 'flex', gap: '10px' }} className="w-full justify-around">
                    {/* Report Cards */}
                    {hazardData.map((hazard) => (
                        <ReportCard key={hazard.title} {...hazard} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default MapComponent;
