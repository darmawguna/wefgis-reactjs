
// import MapComponentRevised from "../../components/map/Component/mapComponent"
import useFetchSensorData from "../../components/custom-hooks/SensorFetchHooks";
import useWaterLevelData from "../../components/custom-hooks/useWaterLavel";
import MapComponent from "../../components/MapContainer"
import ErrorBoundary from "../../error/errorBoundary"
import Navbar from "../../layouts/NavBar"


const MapPage = () => {
    useFetchSensorData();
    useWaterLevelData();
    return (
        <div className="h-screen flex flex-col">
            <Navbar style={{ height: '2vh', width: '100%' }} />
            <ErrorBoundary>
                <div style={{ height: 'calc(100vh - 2vh)' }}>
                    <MapComponent style={{ width: '100%' }} />
                </div>
            </ErrorBoundary>

        </div>

    )
}

export default MapPage
