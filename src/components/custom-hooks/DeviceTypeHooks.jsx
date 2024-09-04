import { useState, useEffect } from 'react';

const useDeviceTypeState = () => {
    const [zoomEnabled, setZoomEnabled] = useState(window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const isDesktop = window.innerWidth >= 768;
            setZoomEnabled(isDesktop);  // True untuk desktop, false untuk mobile
            setIsMobile(!isDesktop);    // True untuk mobile, false untuk desktop
        };

        handleResize();  // Set initial state
        window.addEventListener('resize', handleResize);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return { zoomEnabled, isMobile };
};

export default useDeviceTypeState;
