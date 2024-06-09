
import { overlayMaps } from '../../utils/basemap.js'; // Pastikan path ini sesuai dengan struktur project Anda

const LayerController = () => {
    return (
        <div>
            {overlayMaps.map((layer, index) => (
                <div key={index} className="flex items-center my-2">
                    <input type="checkbox" id={`layer-${ index }`} className="mr-2" />
                    <label htmlFor={`layer-${ index }`}>
                        <span>{layer.name}</span>
                    </label>
                </div>
            ))}
        </div>
    );
};

export default LayerController;
