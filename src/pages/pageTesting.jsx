import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const MoistureClient = () => {
    const [moistureData, setMoistureData] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Menghubungkan...');

    useEffect(() => {
        // Inisialisasi koneksi WebSocket
        const newSocket = io('http://localhost:3000'); // Ganti dengan URL server Anda

        // Menangani koneksi berhasil
        newSocket.on('connect', () => {
            setConnectionStatus('Terkoneksi');
        });

        // Menangani kesalahan koneksi
        newSocket.on('connect_error', () => {
            setConnectionStatus('Gagal terhubung');
        });

        // Menangani pesan sensorData yang diterima dari server
        newSocket.on('sensorData', (data) => {
            setMoistureData(data.value); // Asumsi data berisi nilai kelembapan
        });

        // Membersihkan socket saat komponen unmounted
        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Data Kelembapan</h1>
            <p className="text-lg text-gray-700 mb-2">Status Koneksi: {connectionStatus}</p>
            {moistureData !== null ? (
                <p className="text-2xl font-semibold text-green-600">Kelembapan: {moistureData}%</p>
            ) : (
                <p className="text-red-600">Tidak ada data kelembapan.</p>
            )}
        </div>
    );
};

export default MoistureClient;
