// Sidebar.jsx
import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <button onClick={toggleSidebar} className="text-white p-4">Toggle Sidebar</button>
      <div className="mt-8">
        <h2 className="text-lg">Sidebar Content</h2>
        {/* Add sidebar links or content here */}
      </div>
    </div>
  );
};

export default Sidebar;
