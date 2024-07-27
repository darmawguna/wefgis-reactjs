import { useDashboardStore } from "../../store/DashboardStore"
import UserManagementComponent from "./UserManagementComponent";


const MainDashboardComponent = () => {
    const content = useDashboardStore((state) => state.content);
    return (
        <div className="h-full">
            <div className="flex-1 p-4">
                {content === 'User Management' && (
                    //   <div>
                    //       <h1 className="text-2xl font-bold">User Management</h1>
                    //       <p>Konten untuk User Management.</p>
                    //   </div>
                    <UserManagementComponent />
                )}
                {content === 'Sensor Management' && (
                    <div>
                        <h1 className="text-2xl font-bold">Sensor Management</h1>
                        <p>Konten untuk Sensor Management.</p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default MainDashboardComponent
