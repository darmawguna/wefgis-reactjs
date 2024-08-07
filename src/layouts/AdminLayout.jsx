import MainDashboardComponent from "../components/dashboard/mainComponent";
import NavbarDashboardComponent from "../components/dashboard/navbarDashboardComponent";
import DashboardSidebarComponent from "../components/dashboard/sidebarComponent";

const DashboardLayout = () => {
    return (
        <div className="flex flex-row h-screen w-screen bg-[#F1F1F1]">
            <DashboardSidebarComponent />
            <div className="flex flex-col w-[90vw]">
                <NavbarDashboardComponent />
                <div className="flex-1 overflow-y-auto">
                    <MainDashboardComponent />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;