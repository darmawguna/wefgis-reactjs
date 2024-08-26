
// import MapComponentRevised from "../../components/map/Component/mapComponent"
import MapComponent from "../../components/MapContainer"
import Navbar from "../../layouts/NavBar"


const MapPage = () => {
    return (
        <div className="h-screen flex flex-col">
            <Navbar style={{ height: '2vh', width: '100%' }} />
            <div style={{ height: 'calc(100vh - 2vh)' }}>
                <MapComponent style={{ width: '100%' }} />
            </div>
        </div>

    )
}

export default MapPage
