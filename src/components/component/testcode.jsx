import { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import io from 'socket.io-client';

// Register Chart.js components
Chart.register(...registerables);

const WaterLevelComponent = () => {
    const [selectedSensor, setSelectedSensor] = useState(0);
    const [dataPoints, setDataPoints] = useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [latestData, setLatestData] = useState({ time: 'No data', value: 'No data', location: 'No data' });

    // Define available sensors
    const sensors = useMemo(() => [
        { label: 'Sensor 7', id: 7 },
        { label: 'Sensor 11', id: 11 }
    ], []);

    // Handle sensor selection
    const handleDropdownChange = (event) => {
        setSelectedSensor(parseInt(event.target.value));
    };

    // Effect to handle WebSocket connection and data handling
    useEffect(() => {
        const socket = io('http://localhost:3000/water-levels');

        socket.on('connect', () => {
            setIsConnected(true);
            sensors.forEach(sensor => {
                socket.emit('selectSensor', sensor.id);
            });
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('sensorSelected', (message) => {
            console.log(message);
        });

        socket.on('water-level', (data) => {
            const sensorId = data.sensorId;

            // Update the latest data for the selected sensor
            if (sensorId === sensors[selectedSensor].id) {
                const formattedTime = new Date(data.timestamp).toLocaleDateString('en-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    timeZone: 'Asia/Bangkok'
                });

                const waterLevelInCm = data.water_level;

                setLatestData({ time: formattedTime, value: waterLevelInCm, location: data.location });
            }

            // Update data points for all sensors
            setDataPoints(prevData => {
                const newData = {
                    ...prevData,
                    [sensorId]: (prevData[sensorId] || []).concat({
                        time: new Date(data.timestamp).toLocaleTimeString('en-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: false,
                            timeZone: 'Asia/Bangkok'
                        }),
                        value: data.water_level / 100
                    })
                };

                // Limit the data points to the latest 7 points
                Object.keys(newData).forEach(key => {
                    if (newData[key].length > 7) {
                        newData[key] = newData[key].slice(-7);
                    }
                });

                return newData;
            });
        });

        return () => {
            socket.off('water-level');
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, [sensors, selectedSensor]);

    // Prepare the chart data for the selected sensor
    const chartData = {
        labels: (dataPoints[sensors[selectedSensor].id] || []).map(point => point.time),
        datasets: [
            {
                label: sensors[selectedSensor].label,
                data: (dataPoints[sensors[selectedSensor].id] || []).map(point => point.value),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75,192,192,1)',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointRadius: 5,
                fill: true,
            },
        ],
    };

    // Chart options configuration
    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Water Level (m)',
                },
                beginAtZero: true,
                min: 0,
                max: 4,
                ticks: {
                    stepSize: 1,
                    callback: function (value) {
                        return value + ' m';
                    },
                },
                grid: {
                    display: false,
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Water Level Section</h2>
            <p>{latestData.location}</p>
            <div className="flex justify-between items-center mb-4">
                <div></div>
                <div className="flex gap-4">
                    <p>{latestData.time}</p>
                    <p className="text-[#4bc0c0]">{latestData.value} Cm</p>
                </div>
                <div>
                    <select
                        value={selectedSensor}
                        onChange={handleDropdownChange}
                        className="border border-gray-300 rounded-md p-2"
                    >
                        {sensors.map((sensor, index) => (
                            <option key={index} value={index}>{sensor.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            {isConnected ? (
                <p className="text-green-600">Connected to the server</p>
            ) : (
                <p className="text-red-600">Disconnected from the server</p>
            )}
            <div className="">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default WaterLevelComponent;
