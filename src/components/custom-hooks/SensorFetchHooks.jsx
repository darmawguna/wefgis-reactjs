// File custom-hooks/useFetchWaterCanalData.js
import { useEffect } from 'react';
import { useMapStore } from '../../store/MapStore';
const useFetchSensorData = () => {
    const setSensor = useMapStore((state) => state.setSensor);


    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/sensors/', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // Pastikan untuk memeriksa apakah respons berhasil
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${ response.status }`);
                }

                const result = await response.json();
                const data = result.data;
                const sensors = data.sensors;
                // console.log("nilai dari data", data)

                // Mengakses data dari respons
                if (result.message === "Sensors fetched successfully") {

                    setSensor(sensors); // Ambil sensors dari data

                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchSensorData();
    }, [setSensor]);
};

export default useFetchSensorData;
