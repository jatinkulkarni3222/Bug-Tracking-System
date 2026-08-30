import { Link } from 'react-router-dom';
import SidebarContent from '../SideBarContent';


const SideBar = () => {

  return (
    <div className="fixed left-0 top-20 w-72 h-screen bg-gray-950 dark:bg-black shadow-xl z-40 border-r border-gray-800 flex flex-col">
      {/* Branding Section */}
      <div className="px-6 py-6 border-b border-gray-800">
        <h2 className='text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent'>
          bugtracker
        </h2>
        <p className="text-xs text-gray-500 mt-1">Issue Tracking System</p>
      </div>

      {/* Navigation Section */}
      <div className="flex-1 pt-6">
        <SidebarContent />
      </div>
    </div>
  );
};

export default SideBar;
