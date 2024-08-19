import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebarComponent = () => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop(); // Mengambil bagian terakhir dari path
    const [activeButton, setActiveButton] = useState(currentPath || ''); // Menetapkan tombol aktif awal

    const buttons = [
        {
            label: 'Dashboard',
            route: '', // Rute untuk Dashboard
        },
        {
            label: 'User Management',
            route: 'user-management', // Rute untuk Manajemen Pengguna
        },
        {
            label: 'Sensor Management',
            route: 'sensor-management', // Rute untuk Manajemen Sensor
        }
    ];

    useEffect(() => {
        setActiveButton(currentPath);
    }, [currentPath]);

    return (
        <div className="w-[10vw] h-full flex flex-col gap-6 bg-[#103A5E]">
            <h3 className="text-white text-xl mt-4 ml-8">Dashboard</h3>
            <div className="flex flex-col">
                {buttons.map((button) => (
                    <div className="text-white" key={button.label}>
                        <Link
                            to={`/dashboard/${ button.route }`}
                            onClick={() => setActiveButton(button.route || 'Dashboard')}
                            className={`${ activeButton === button.route ? 'bg-blue-500 text-white' : 'bg-transparent text-white' } p-2 rounded w-full block text-left`}
                        >
                            {button.label}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardSidebarComponent;