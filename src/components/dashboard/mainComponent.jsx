import { useDashboardStore } from "../../store/DashboardStore"
import FormComponent from "../component/FormComponent";
import UserManagementComponent from "./UserManagementComponent";


const MainDashboardComponent = () => {
    const content = useDashboardStore((state) => state.content);
    return (
        <div className="h-auto max-h-full overflow-hidden">
            <div className="flex-1 px-4 h-auto overflow-hidden">
                {content === 'User Management' && (
                    <div>
                        <UserManagementComponent />
                    </div>
                )}
                {content === 'Sensor Management' && (
                    <div className="w-full">
                        <FormComponent />
                    </div>
                )}
            </div>

        </div>
    )
}

export default MainDashboardComponent
