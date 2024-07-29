import { useState } from 'react';
import { useDashboardStore } from '../../store/DashboardStore';



const DashboardSidebarComponent = () => {
    const [activeButton, setActiveButton] = useState('User Management');
    const setContent = useDashboardStore((state) => state.setContent);

    const buttons = [
        {
            label: 'User Management',
            onClick: () => {
                setContent('User Management');
                console.log('User Management clicked');
            }
        },
        {
            label: 'Sensor Management',
            onClick: () => {
                setContent('Sensor Management');
                console.log('Sensor Management clicked');
            }
        }
    ];

    return (
        <>
            <div className=" w-[10vw] h-full flex flex-col gap-6 bg-[#103A5E]">
                <h3 className="text-white text-xl mt-4 ml-8">Dashboard</h3>
                <div className="flex flex-col ">
                    {buttons.map((button) => (
                        <div className="text-white " key={button.label}>
                            <button
                                onClick={() => {
                                    setActiveButton(button.label);
                                    button.onClick()
                                }}
                                className=

                                {`${ activeButton === button.label ? 'bg-blue-500 text-white' : 'bg-transparent text-white' } p-2 rounded w-full`}
                            >
                                {button.label}
                            </button>
                        </div>
                    ))}
                </div>
            </div >
        </>
    );
};

export default DashboardSidebarComponent;