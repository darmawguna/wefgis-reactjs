import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchComponent from './SearchComponent';

const UserFormWithMap = ({ onSubmit, initialValues = { name: '', email: '', phone_number: '', location: '', latitude: null, longitude: null } }) => {
    const [name, setName] = useState(initialValues.name || '');
    const [email, setEmail] = useState(initialValues.email || '');
    const [phone_number, setPhoneNumber] = useState(initialValues.phone_number || '');
    const [location, setLocation] = useState(initialValues.location || '');
    const [latitude, setLatitude] = useState(initialValues.latitude || null);
    const [longitude, setLongitude] = useState(initialValues.longitude || null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            const response = await fetch(`http://localhost:3000/users${ initialValues.user_id ? `/${ initialValues.user_id }` : '' }`, {
                method: initialValues.user_id ? 'PUT' : 'POST',
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
            setName('');
            setEmail('');
            setPhoneNumber('');
            setLocation('');
            setLatitude(null);
            setLongitude(null);
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
        // Validate Email
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Please enter a valid email address.');
            return;
        }
        // Validate Phone Number
        if (!phone_number || !phone_number.match(/^[0-9]+$/)) {
            setError('Please enter a valid phone number.');
            return;
        }
        // Validate all inputs
        if (!name || !email || !phone_number || !location || latitude === null || longitude === null) {
            setError('Please fill out all fields.');
            return;
        }
        setError('');

        const userData = {
            name,
            email,
            phone_number,
            location,
            latitude,
            longitude,
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
            <h2 className="text-xl font-semibold mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                        type="text"
                        value={phone_number} // Ensure controlled
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 mt-6">Location</h2>
            <div className="mb-4">
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
                    onClick={() => onSubmit()}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    {loading ? 'Adding...' : initialValues.user_id ? 'Edit User' : 'Add User'}
                </button>
            </div>
        </form>
    );
};

export default UserFormWithMap;