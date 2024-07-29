// import NavbarDashboardComponent from "../components/dashboard/navbarDashboardComponent";

import MainDashboardComponent from "../components/dashboard/mainComponent";
import NavbarDashboardComponent from "../components/dashboard/navbarDashboardComponent";
import DashboardSidebarComponent from "../components/dashboard/sidebarComponent";


const DashboardLayout = () => {
    return (
        <div className="flex flex-row h-screen w-screen bg-[#F1F1F1]">
            <DashboardSidebarComponent />
            <div className="w-[90vw]  flex flex-col">
                <NavbarDashboardComponent />
                <MainDashboardComponent />
            </div>
        </div>
    );
};

export default DashboardLayout;
