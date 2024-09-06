import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useMapStore } from '../../store/MapStore';
import useWaterLevelData from '../custom-hooks/useWaterLavel';

// Register Chart.js components
Chart.register(...registerables);

const WaterLevelGraph = () => {
    const selectedSensor = useMapStore((state) => state.selectedSensor);
    const { dataPoints, isConnected, latestData } = useWaterLevelData(selectedSensor);

    // Prepare the chart data for the selected sensor
    const chartData = {
        labels: (dataPoints[selectedSensor.id] || []).map(point => point.time),
        datasets: [
            {
                label: 'Sensor ' + selectedSensor.id,
                data: (dataPoints[selectedSensor.id] || []).map(point => point.value),
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
        <div className="max-w-full mx-auto bg-white rounded-lg">
            <h2 className="text-xl font-semibold">Water Level Section</h2>
            {
                latestData.location === 'No data' ? (
                    <p>Location not found</p>
                ) : (
                    <p>{latestData.location}</p>
                )
            }
            <div className="flex justify-between mb-4 gap-4">
                {
                    latestData.time === 'No data' ? (
                        <p>Data not found</p>
                    ) : (
                        <p>{latestData.time}</p>
                    )
                }
                {
                    latestData.value === 'No data' ? (
                        <p>Data not found</p>
                    ) : (
                        <p className="text-[#4bc0c0]">{latestData.value} Cm</p>
                    )
                }
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

export default WaterLevelGraph;
