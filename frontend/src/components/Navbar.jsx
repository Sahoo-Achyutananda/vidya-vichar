import React from 'react';
import { useNavigate } from 'react-router-dom'; 
// replace 👤 with a real icon if needed (e.g., react-icons)

function Navbar() {
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    console.log("user logging out"); // placeholder for real auth logic
    navigate('/login'); // go to login
  };
  
  // go to profile page
  const handleProfileClick = () => {
    navigate('/user/profile'); 
  };

  return (
    <div className="w-full bg-purple-900/80 backdrop-blur-sm h-[60px] text-white p-4 border-b-2 border-gray-700/50 shadow-xl fixed top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-full">
        
        {/* logo / dashboard navigation */}
        <div
          id="logo"
          className="text-2xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 cursor-pointer"
          onClick={() => navigate('/user/dashboard')}
        >
          STUDY APP
        </div>
        
        {/* nav buttons */}
        <div id="navlinks" className="flex flex-row gap-4 items-center">
          
          {/* profile button */}
          <button
            onClick={handleProfileClick}
            className="text-4xl text-cyan-400 hover:text-green-400 transition-colors duration-300 p-1 rounded-full focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50"
            title="Profile"
          >
            👤
          </button>

          {/* logout button */}
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 text-sm font-semibold rounded-lg shadow-lg
                       bg-gradient-to-r from-red-600 to-pink-700
                       hover:from-red-700 hover:to-pink-800
                       transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
