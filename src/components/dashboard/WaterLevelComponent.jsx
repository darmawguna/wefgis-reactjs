import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import io from 'socket.io-client';

// Register Chart.js components
Chart.register(...registerables);

const WaterLevelComponent = () => {
    const [selectedSensor, setSelectedSensor] = useState(0);
    const [dataPoints, setDataPoints] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [latestData, setLatestData] = useState({ time: 'No data', value: 'No data', location: 'No data' });

    const sensors = [
        { label: 'Sensor 1', id: 'sensor1' },
        { label: 'Sensor 2', id: 'sensor2' }
    ];

    const handleDropdownChange = (event) => {
        setSelectedSensor(parseInt(event.target.value));
    };

    useEffect(() => {
        const socket = io('http://localhost:3000/water-levels'); // Ganti sesuai endpoint WebSocket kamu
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('water-level', (data) => {
            // Mengonversi timestamp ke format tanggal (dd-mm-yyyy)
            const formattedTime = new Date(data.timestamp).toLocaleDateString('en-ID', {
                day: '2-digit',
                month: 'long',  // Menampilkan nama bulan (e.g., Januari, Februari)
                year: 'numeric',
                timeZone: 'Asia/Bangkok'
            });



            // Mengonversi water_level dari meter ke centimeter
            const waterLevelInCm = data.water_level; // Data langsung dalam centimeter

            // Memperbarui latestData
            setLatestData({ time: formattedTime, value: waterLevelInCm, location: data.location });

            setDataPoints((prevData) => {
                const newData = [...prevData, {
                    time: new Date(data.timestamp).toLocaleTimeString('en-ID', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false,
                        timeZone: 'Asia/Bangkok'
                    }), value: data.water_level / 100
                }];
                if (newData.length > 7) { // Membatasi jumlah data yang tampil
                    newData.shift();
                }
                return newData;
            });
        });

        // Membersihkan listener saat komponen di-unmount
        return () => {
            socket.off('water-level');
            socket.off('connect');
            socket.off('disconnect');
            socket.disconnect();
        };
    }, [selectedSensor]);

    const chartData = {
        labels: dataPoints.map(point => point.time),
        datasets: [
            {
                label: sensors[selectedSensor].label,
                data: dataPoints.map(point => point.value),
                borderColor: 'rgba(75,192,192,1)', // Warna garis
                backgroundColor: 'rgba(75,192,192,0.2)', // Warna latar belakang di bawah garis
                borderWidth: 2, // Ketebalan garis
                pointBackgroundColor: 'rgba(75,192,192,1)', // Warna titik
                pointBorderColor: 'rgba(75,192,192,1)', // Warna border titik
                pointRadius: 5, // Radius titik
                fill: true, // Mengisi area di bawah garis
            },
        ],
    };

    const options = {
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Moisture Level (m)',  // Label pada sumbu y
                },
                beginAtZero: true,
                min: 0,  // Minimum nilai sumbu y
                max: 4,  // Maksimum nilai sumbu y
                ticks: {
                    stepSize: 1,  // Interval label setiap 2 meter
                    callback: function (value) {
                        return value + ' m';  // Menambahkan "m" ke setiap label
                    },
                },
                grid: {
                    display: false,  // Menampilkan garis grid pada y-axis
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Time',  // Label pada sumbu x
                },
                grid: {
                    display: false,  // Menyembunyikan garis grid pada x-axis
                },
            },
        },
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Water Level Section</h2>
            <p>{latestData.location}</p>
            <div className="flex justify-between items-center mb-4">
                <div> </div>
                <div className='flex gap-4'>
                    <p>{latestData.time}</p>
                    <p className='text-[#4bc0c0]'>{latestData.value} Cm</p>
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
