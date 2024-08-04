
import { Outlet } from "react-router-dom";
import NavbarDashboardComponent from "../components/dashboard/navbarDashboardComponent";
import DashboardSidebarComponent from "../components/dashboard/sidebarComponent";

/**
 * Renders the DashboardPage component.
 *
 * @return {JSX.Element} The rendered DashboardPage component.
 */
const DashboardPage = () => {
    // const content = useDashboardStore((state) => state.content);
    return (
        <>
            <div className="flex flex-row h-screen w-screen bg-[#F1F1F1]">
                <DashboardSidebarComponent />
                <div className="flex flex-col w-[90vw]">
                    <NavbarDashboardComponent />
                    <div className="flex-1 overflow-y-auto">
                        {/* <MainDashboardComponent /> */}
                        <div className="h-auto max-h-full ">
                            <div className="flex-1 px-4 h-auto ">
                                <Outlet />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage
