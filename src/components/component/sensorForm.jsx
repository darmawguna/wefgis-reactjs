import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchComponent from './SearchComponent';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for DatePicker
import SensorManagementStore from '../../store/SensorManagementStore';

const SensorForm = ({ onSubmit, initialValues = { description: '', installation_date: '', status: '', location: '', latitude: null, longitude: null } }) => {
    const [location, setLocation] = useState(initialValues.location || '');
    const [description, setDescription] = useState(initialValues.description || '');
    const [status, setStatus] = useState(initialValues.status || '');
    const [installation_date, setInstalationDate] = useState(initialValues.installation_date ? new Date(initialValues.installation_date) : null); // Manage date state
    const [latitude, setLatitude] = useState(initialValues.latitude || null);
    const [longitude, setLongitude] = useState(initialValues.longitude || null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setIsAddingSensor, setIsEditingSensor, isAddingSensor } = SensorManagementStore();

    const getCoordinates = async (location) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${ encodeURIComponent(location) }`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setLatitude(lat);
                setLongitude(lon);
                setError('');
                setLocation(location);
            } else {
                setError('Location not found. Please check the input.');
            }
        } catch (error) {
            setError('Error fetching coordinates.');
        }
    };

    const handleLocationBlur = () => {
        if (location) {
            getCoordinates(location);
        }
    };
    const addUser = async (userData) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/sensors${ initialValues.id ? `/${ initialValues.id }` : '' }`, {
                method: initialValues.id ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log('Request payload:', JSON.stringify(userData));

            if (!response.ok) {
                throw new Error('Failed to add user.');
            }

            // Reset form after successful addition
            // Reset form after successful addition
            setDescription('');
            setLocation('');
            setLatitude(null);
            setLongitude(null);
            setInstalationDate(null); // Reset date
            setError('');


            onSubmit(); // Call onSubmit 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all inputs
        // Validate all inputs
        if (!description || !status || !location || latitude === null || longitude === null || !installation_date) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');

        const userData = {
            description,
            status,
            location,
            latitude,
            longitude,
            installation_date: installation_date.toISOString().split('T')[0],  // Format date for submission
        };
        addUser(userData);
    };

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
                getAddress(e.latlng.lat, e.latlng.lng);
            },
        });
        return null;
    };

    const onCancel = () => {
        console.log(isAddingSensor);
        setIsAddingSensor(false);
        setIsEditingSensor(false);
        console.log(isAddingSensor);
    }

    const getAddress = async (lat, lng) => {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ lat }&lon=${ lng }`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.address) {
                setLocation(data.display_name);
            } else {
                setError('Address not found.');
            }
        } catch (error) {
            setError('Error fetching address.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Sensor Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onBlur={handleLocationBlur}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    {error && error.includes("Location not found") && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                        value={status} // Ensure controlled
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    >
                        <option value="" disabled>Select status</option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Installation Date</label>
                    <DatePicker
                        selected={installation_date}
                        onChange={(date) => setInstalationDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="w-full border border-gray-300 rounded-lg p-2"
                        placeholderText="Select date"
                        required
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-6">Location</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Latitude</label>
                    <input
                        type="number"
                        step="any"
                        value={latitude !== null ? latitude : ''} // Ensure controlled
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Longitude</label>
                    <input
                        type="number"
                        step="any"
                        value={longitude !== null ? longitude : ''} // Ensure controlled
                        readOnly
                        className="w-full border border-gray-300 rounded-lg p-2 bg-gray-200"
                    />
                </div>
            </div>

            <div className="mb-4">
                <div className='h-full w-full relative z-0'>
                    <MapContainer center={[13.815760002518932, 100.03820782652014]} zoom={10} className="h-80 z-0">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <MapClickHandler />

                        {latitude && longitude && (
                            <Marker position={[latitude, longitude]} />
                        )}
                    </MapContainer>
                    <div className="absolute top-4 right-4 z-50">
                        <SearchComponent onSearch={getCoordinates} placeholder="Enter location" />
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={() => onCancel()}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    {loading ? 'Adding...' : initialValues.id ? 'Edit Sensor' : 'Add Sensor'}
                </button>
            </div>
        </form>
    );
};

export default SensorForm;