import { useState } from 'react';
// import Geocoder from 'geocoder'; 

const AddUserForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // untuk phone number merupakan integer
    const [phoneNumber, setPhoneNumber] = useState();
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    // untuk latitude dan longitude merupakan float
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [error, setError] = useState('');

    const getCoordinates = async (location) => {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${ encodeURIComponent(location) }`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setLatitude(lat);
                setLongitude(lon);
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


    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi Email
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setError('Please enter a valid email address.');
            return;
        }

        // Validasi Nomor Telepon
        if (!phoneNumber.match(/^[0-9]+$/)) {
            setError('Please enter a valid phone number.');
            return;
        }

        // Validasi untuk setiap input agar tidak kosong
        if (!name || !email || !phoneNumber || !role || !location || !latitude || !longitude) {
            setError('Please fill out all fields.');
            return;
        }

        setError('');
        // Logika untuk menambahkan pengguna baru
        onSubmit();
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
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                        type="text"
                        value={location}
                        onBlur={handleLocationBlur}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                    {error.match("Location not found. Please check the input.") && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
                    <label className="block text-sm font-medium mb-2">Latitude</label>
                    <input
                        type="number"
                        step="any"
                        value={latitude}
                        readOnly
                        onChange={(e) => setLatitude(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Longitude</label>
                    <input
                        type="number"
                        step="any"
                        value={longitude}
                        readOnly
                        onChange={(e) => setLongitude(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-2">Role</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2"
                    />
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={() => onSubmit(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
                >
                    Add User
                </button>
            </div>
        </form>
    );
};

export default AddUserForm;
