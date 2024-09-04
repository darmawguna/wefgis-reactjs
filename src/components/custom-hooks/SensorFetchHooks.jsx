// File custom-hooks/useFetchWaterCanalData.js
import { useEffect } from 'react';
import { useMapStore } from '../../store/MapStore';
const useFetchSensorData = () => {
    const setSensor = useMapStore((state) => state.setSensor);
    const sensor = useMapStore((state) => state.sensor);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/sensors/', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                const data = result.data;
                console.log(data);
                if (result.statusCode === 200) {
                    setSensor(data.sensors);
                    console.log(data);
                }
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchSensorData();
    }, [setSensor, sensor]);
};

export default useFetchSensorData;
