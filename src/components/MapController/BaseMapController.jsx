
import { baseMaps } from '../utils/basemap'; // Pastikan path ini sesuai dengan struktur project Anda

const BasemapController = () => {
    return (
        <div>
            {baseMaps.map((map, index) => (
                <div key={index} className="flex items-center my-2">
                    <input type="radio" id={`basemap-${ index }`} name="basemap" className="mr-2" />
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
