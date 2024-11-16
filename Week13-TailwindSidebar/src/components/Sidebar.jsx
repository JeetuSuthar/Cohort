// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="text-white bg-gray-400 p-2 fixed top-5 left-4 z-50 rounded-md"
                onClick={toggleSidebar}>
            </button>
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out`}>
                <div className="p-3 ml-12 text-xl font-semibold border-b border-gray-700">
                    My List
                </div>
                <nav className="mt-4 flex flex-col space-y-2">
                    <Link to="/" className="p-2 hover:bg-gray-700" onClick={toggleSidebar}>
                        Home
                    </Link>
                    <Link to="/about" className="p-2 hover:bg-gray-700" onClick={toggleSidebar}>
                        About
                    </Link>
                    <Link to="/services" className="p-2 hover:bg-gray-700" onClick={toggleSidebar}>
                        Services
                    </Link>
                    <Link to="/contact" className="p-2 hover:bg-gray-700" onClick={toggleSidebar}>
                        Contact
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
