import { useState } from 'react';
import { Link } from 'react-router-dom';


const DashboardSidebarComponent = () => {
    const [activeButton, setActiveButton] = useState('Dashboard');

    const buttons = [
        {
            label: 'Dashboard',
            route: '', // Tambahkan route

        },
        {
            label: 'User Management',
            route: 'user-management', // Tambahkan route

        },
        {
            label: 'Sensor Management',
            route: 'sensor-management', // Tambahkan route

        }
    ];

    return (
        <>
            <div className=" w-[10vw] h-full flex flex-col gap-6 bg-[#103A5E]">
                <h3 className="text-white text-xl mt-4 ml-8">

                </h3>
                <div className="flex flex-col ">
                    {buttons.map((button) => (
                        <div className="text-white " key={button.label}>
                            <Link
                                to={`/dashboard/${ button.route }`}
                                onClick={() => {
                                    setActiveButton(button.label);
                                    // button.onClick();
                                }}
                                className={`${ activeButton === button.label ? 'bg-blue-500 text-white' : 'bg-transparent text-white' } p-2 rounded w-full block text-left`}
                            >
                                {button.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

export default DashboardSidebarComponent;
