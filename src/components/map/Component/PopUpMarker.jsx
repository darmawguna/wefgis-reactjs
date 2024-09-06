import { usePopupMarkerStore, useMapStore } from "../../../store/MapStore";
import { useEffect, useState } from 'react';
import WaterLevelGraph from "../../component/WaterLevelGraph";


const MobileSensorDetail = () => {
    const isOpen = usePopupMarkerStore((state) => state.isOpen);
    const setOpen = usePopupMarkerStore((state) => state.setOpenMarker);
    const selectedSensor = useMapStore((state) => state.selectedSensor);
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
        <div className={`fixed inset-0 z-50 rounded-t-3xl flex top-16 items-center justify-center bg-white transition-opacity duration-300 shadow-lg ${ isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none' } overflow-y-auto`}>
            <div className="w-full h-full p-4 bg-white shadow-2xl rounded-lg">
                <div className="flex justify-end">
                    <button
                        onClick={handleClose}
                        className="text-red-500 hover:text-red-700 font-bold p-4"
                    >
                        Close
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Sensor Details</h2>
                <p className="mb-2">Location: <span className="font-medium">{selectedSensor?.location}</span></p>
                <div className="flex items-center justify-between gap-2 mb-2">
                    <p>Latitude: <span className="font-medium">{selectedSensor?.latitude}</span></p>
                    <p>Longitude: <span className="font-medium">{selectedSensor?.longitude}</span></p>
                </div>

                <div className="mb-4 flex-1">
                    {selectedSensor && <WaterLevelGraph />}
                </div>
                <p className="mb-2">Description: <span className="font-medium">{selectedSensor?.description}</span></p>
                <div className="mt-4 font-semibold">All Information</div>
            </div>
        </div>
    );
};

export default MobileSensorDetail;