// src/components/Header.js
import  { useState } from 'react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className=" flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center">
                <img src="/public/logo.png" alt="Logo" className="h-8 md:h-10" />
                <h1 className="text-lg font-bold ml-2 md:text-xl">WEF GIS</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600">Welcome</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Background</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Water Level Monitoring</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Join To Know</a>
            </nav>
            <div className="hidden md:flex">
                <a href="#" className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700">
                    WebGIS &rarr;
                </a>
            </div>
            <button className="md:hidden" onClick={handleToggle}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Drawer */}
            {isOpen && (
                <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col shadow-lg rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">WEF GIS</h2>
                        <button onClick={handleToggle} className="text-gray-500 text-2xl">
                            &times;
                        </button>
                    </div>
                    <nav className="mt-4 space-y-4">
                        <a href="#" className="text-gray-700 hover:text-blue-600 block">Welcome</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 block">Background</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 block">Water Level Monitoring</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600 block">Join To Know</a>
                    </nav>
                    <div className="mt-auto">
                        <a href="#" className="bg-purple-600 text-white py-2 px-4 rounded-lg block text-center hover:bg-purple-700">
                            WebGIS &rarr;
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;