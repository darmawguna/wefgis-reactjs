
import { FaMap, FaLayerGroup, FaListAlt } from 'react-icons/fa'; // Sesuaikan dengan ikon yang Anda inginkan
import { useSidebarStore } from '../../store/MapStore';

const SidebarIcons = () => {
    const setActiveContent = useSidebarStore((state) => state.setContent);
    const content = useSidebarStore((state) => state.content);
    const isOpen = useSidebarStore((state) => state.isOpen);
    console.log(content)
    return (
        <div className={`flex flex-col gap-4 transition-all duration-300 ${ isOpen ? 'mr-64' : 'mr-0' }`}>
            <button onClick={() => setActiveContent('Basemap')} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                <FaMap size={24} />
            </button>
            <button onClick={() => setActiveContent('Layer')} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                <FaLayerGroup size={24} />
            </button>
            <button onClick={() => setActiveContent('Legend')} className="bg-gray-200 p-2 rounded-md hover:bg-gray-300">
                <FaListAlt size={24} />
            </button>
        </div>
    );
};

export default SidebarIcons;
