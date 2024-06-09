
import MapComponent from "../../components/MapContainer";
import Navbar from "../NavBar";
// import SidebarMap from "./SideBarMap";

const LayoutMap = () => {

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-none">
                <Navbar style={{ height: '2vh', width: '100%' }} />
            </div>
            <div className="flex-grow">
                <MapComponent style={{ height: '98vh', width: '100%' }} />
            </div>
        </div>
    );
};

export default LayoutMap;