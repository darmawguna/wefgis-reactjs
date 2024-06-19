// File custom-hooks/useFetchWaterCanalData.js
import { useEffect } from 'react';
import { useMapStore } from '../../store/MapStore';
import { token } from '../../utils/token';

const useFetchWaterCanalData = () => {
    const setWaterCanal = useMapStore((state) => state.setWaterCanal);
    const waterCanal = useMapStore((state) => state.waterCanal);

    useEffect(() => {
        const fetchWaterCanalData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/water', {
                    headers: {
                        'Authorization': `Bearer ${ token }`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.success) {
                    setWaterCanal(result.data);
                    console.log(waterCanal);
                }
            } catch (error) {
                console.error('Error fetching water canal data:', error);
            }
        };

        fetchWaterCanalData();
    }, [setWaterCanal, waterCanal]);
};

export default useFetchWaterCanalData;
