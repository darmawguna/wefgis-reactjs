import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useMapStore } from '../../store/MapStore';
// import useWaterLevelData from '../custom-hooks/useWaterLavel'; // Pastikan nama hook benar
import { useWaterLevelStore } from '../../store/WaterLevelStore';

// Register Chart.js components
Chart.register(...registerables);

const WaterLevelGraph = () => {
    const selectedSensor = useMapStore((state) => state.selectedSensor);
    // const { dataPoints, latestData } = useWaterLevelData();
    const dataPoints = useWaterLevelStore((state) => state.dataPoints);
    const latestData = useWaterLevelStore((state) => state.latestData);
    console.log(latestData)

    // Prepare the chart data for the selected sensor
    const sensorId = selectedSensor?.id;
    const chartData = {
        labels: (dataPoints[sensorId] || []).map(point => point.time),
        datasets: [
            {
                label: 'Sensor ' + (sensorId || 'Unknown'),
                data: (dataPoints[sensorId] || []).map(point => point.value),
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
        <div className="max-w-full mx-auto bg-white rounded-lg p-4">
            <h2 className="text-xl font-semibold">Water Level Section</h2>
            {
                latestData[sensorId]?.location ? (
                    <p>{latestData[sensorId].location}</p>
                ) : (
                    <p>Location not found</p>
                )
            }
            <div className="flex justify-between mb-4 gap-4">
                {
                    latestData[sensorId]?.time ? (
                        <p>{latestData[sensorId].time}</p>
                    ) : (
                        <p>Data not found</p>
                    )
                }
                {
                    latestData[sensorId]?.value !== undefined ? (
                        <p className="text-[#4bc0c0]">{latestData[sensorId].value} Cm</p>
                    ) : (
                        <p>Data not found</p>
                    )
                }
            </div>
            <div className="">
                <Line data={chartData} options={options} />
            </div>
            
        </div>
    );
};

export default WaterLevelGraph;
