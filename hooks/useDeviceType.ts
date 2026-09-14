"use client";
import { useState, useEffect } from 'react';

export default function useDeviceType() {
    const [device, setDevice] = useState('desktop');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width <= 430) setDevice('mobile-small'); // iPhone Basic, SE, Android standar
            else if (width <= 768) setDevice('mobile-large'); // iPhone Pro Max / Plus
            else if (width <= 1380) setDevice('tablet'); // iPad biasa / iPad Pro portrait
            else setDevice('desktop'); // Laptop / Layar gede
        };

        handleResize(); // Panggil pas pertama kali load
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return device; // Bakal nge-return string tipe devicenya
}
