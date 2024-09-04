import { usePopupMarkerStore } from "../../../store/MapStore";
import { useEffect, useState } from 'react';

const SidebarMarker = () => {
    const isOpen = usePopupMarkerStore((state) => state.isOpen);
    const setOpen = usePopupMarkerStore((state) => state.setOpenMarker);
    const [visible, setVisible] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => setVisible(false), 300); // Durasi transisi
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!visible) {
        return null; // Tidak render komponen jika tidak terlihat
    }

    return (
        <div className={`flex items-center justify-center z-0 right-0 h-full`}>
            <div className={`fixed top-[85px] right-0 h-5/6 w-2/6 bg-white shadow-2xl rounded-lg mt-2 mr-2 transition-transform duration-300 ${ isOpen ? 'translate-x-0' : 'translate-x-full' } border border-gray-300`}>
                <div className="w-full h-full">
                    <div className="flex justify-end">
                        <button
                            onClick={handleClose}
                            className="text-red-500 hover:text-red-700 font-bold mb-2 p-4"
                        >
                            Close Sidebar
                        </button>
                    </div>
                    <div className="p-4 flex flex-col">
                        {/* Bagian Alamat sensor */}
                        <h2 className="text-xl font-semibold mb-4">Marker Details</h2>
                        {/* Bar untuk menampilkan data tanggal, Nilai berupa angka, */}
                        <p>Some detailed information about the marker.</p>
                        {/* grafis dari nilai sensor */}
                        <p className="text-gray-700">Some detailed information about the marker.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SidebarMarker;