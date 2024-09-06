import { usePopupMarkerStore, useMapStore } from "../../../store/MapStore";
import { useEffect, useState } from 'react';
// import WaterLevelComponent from "../../dashboard/WaterLevelComponent";
import WaterLevelGraph from "../../component/WaterLevelGraph";

const SidebarMarker = () => {
    const isOpen = usePopupMarkerStore((state) => state.isOpen);
    const setOpen = usePopupMarkerStore((state) => state.setOpenMarker);
    const selectedSensor = useMapStore((state) => state.selectedSensor); // Ambil sensor yang dipilih
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible) {
        return null;
    }

    return (
        <div className={`flex items-center justify-center z-0 right-0 h-full`}>
            <div className={`fixed top-[85px] right-0 h-5/6 w-2/6 bg-white shadow-2xl rounded-lg mt-2 mr-2 transition-transform duration-300 ${ isOpen ? 'translate-x-0' : 'translate-x-full' } border border-gray-300 overflow-y-auto`}>
                <div className="w-full h-full flex flex-col">
                    <div className="flex justify-end">
                        <button
                            onClick={handleClose}
                            className="text-red-500 hover:text-red-700 font-bold p-4"
                        >
                            Close Sidebar
                        </button>
                    </div>
                    <div className="p-4 flex flex-col flex-1 overflow-y-auto">
                        <h2 className="text-xl font-semibold mb-4">Sensor Details</h2>
                        {/* Tampilkan data sensor */}
                        <p>Location: {selectedSensor?.location}</p>
                        <div className="flex items-center justify-between gap-2">
                            <p>Latitude: {selectedSensor?.latitude}</p>
                            <p>Longitude: {selectedSensor?.longitude}</p>
                        </div>

                        {/* Tambahkan informasi lain sesuai kebutuhan */}
                        <div className="mb-4 flex-1">
                            {selectedSensor && <WaterLevelGraph />}
                        </div>
                        <p>Description: {selectedSensor?.description}</p>

                        <div className="mt-4">All Information</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarMarker;
