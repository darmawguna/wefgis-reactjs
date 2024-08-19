import CardComponent from "../component/CardComponent";
import MoistureComponent from "../component/testcode";
import WaterLevelComponent from "./WaterLevelComponent";

const DashboardComponent = () => {
    const cards = [
        {
            label: 'User Management',
            route: 'user-management', // Route for User Management
        },
        {
            label: 'Sensor Management',
            route: 'sensor-management', // Route for Sensor Management
        },
        {
            label: 'Warning History',
            route: ''
        }
    ];
    return (
        <div className="flex flex-col p-4 h-full overflow-y-auto">
            <div className="w-full bg-white shadow-lg rounded-lg flex-1 flex flex-col">
                <div className="my-4 flex flex-row justify-between px-4">
                    Welcome to Dashboard
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="min-w-full flex flex-col h-screen">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mx-4">
                            {cards.map((card, index) => (
                                <CardComponent
                                    key={index}
                                    title={card.label}
                                    link={card.route}
                                />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex-1 rounded-lg  mr-2 p-4">
                                <WaterLevelComponent />
                            </div>
                            <div className="flex-1 rounded-lg  ml-2 p-4">
                                {/* TODO: buat sebuah component untuk warning History */}
                                <MoistureComponent />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;