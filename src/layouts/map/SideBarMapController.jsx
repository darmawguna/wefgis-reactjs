import BasemapController from "../../components/MapController/BaseMapController";
import LayerController from "../../components/MapController/LayerController";
import LegendController from "../../components/MapController/LegendController";
import { useSidebarStore } from "../../store/MapStore";
// import { useMapStore } from '../store/MapStore';

const SidebarController = () => {
    const isOpen = useSidebarStore((state) => state.isOpen);
    const content = useSidebarStore((state) => state.content);
    const setOpen = useSidebarStore((state) => state.setOpen);
    

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={`fixed top-16 right-0 h-full w-64 bg-white shadow-lg transform ${ isOpen ? 'translate-x-0' : 'translate-x-full' } transition-transform duration-300 z-40`}>
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-semibold">{content}</h2>
                <button onClick={handleClose} className="text-xl">&times;</button>
            </div>
            <div className="p-4 overflow-y-auto">
                {content === 'Basemap' && <BasemapController  />}
                {content === 'Layer' && <LayerController />}
                {content === 'Legend' && <LegendController />}
            </div>
        </div>
    );
};

export default SidebarController;
