
const LayerGrid = () => {
    const layers = [
        { id: 1, imageUrl: '/public/assets/icon-basemap/google-streets.png', alt: 'First Layer' },
        { id: 2, imageUrl: '/public/assets/icon-basemap/google-hibrid.png', alt: 'Second Layer' },
        { id: 3, imageUrl: '/public/assets/icon-basemap/openstreetmap_de.png', alt: 'Third Layer' },
        { id: 4, imageUrl: '/public/assets/icon-basemap/google-earth.png', alt: 'Fourth Layer' }
    ];

    return (
        <div className="absolute top-2 right-2 bg-white bg-opacity-80 p-2 rounded-md shadow-lg grid grid-cols-2 gap-2 w-`12` h-12">
            {layers.map(layer => (
                <div key={layer.id} className="flex justify-center items-center bg-gray-200 overflow-hidden">
                    <img src={layer.imageUrl} alt={layer.alt} className="w-4 h-4 object-cover" />
                </div>
            ))}
        </div>
    );
};

export default LayerGrid;
