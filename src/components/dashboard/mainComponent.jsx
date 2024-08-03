import { useDashboardStore } from "../../store/DashboardStore"
import SensorManagementComponent from "./SensoManagementComponent";

import UserManagementComponent from "./UserManagementComponent";


const MainDashboardComponent = () => {
    const content = useDashboardStore((state) => state.content);
    return (
        <div className="h-auto max-h-full ">
            <div className="flex-1 px-4 h-auto ">
                {content === 'User Management' && (
                    <div>
                        <UserManagementComponent />
                    </div>
                )}
                {content === 'Sensor Management' && (
                    <div >
                        <SensorManagementComponent />
                    </div>
                )}
            </div>

        </div>
    )
}

export default MainDashboardComponent
