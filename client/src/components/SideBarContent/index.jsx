import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from '../../contexts/UserContext';
import { RiDashboardLine, RiBugFill, RiCheckboxCircleLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import { AiOutlineForm } from "react-icons/ai";
import { hasRole } from '../../utils/auth';

const SidebarContent = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const { currentUser } = useUser();

  const navItems = [
    { path: '/', icon: RiDashboardLine, label: 'Dashboard', public: true },
    { path: '/bugs', icon: RiBugFill, label: 'All Issues', role: 'admin' },
    { path: '/mybugs', icon: RiCheckboxBlankCircleLine, label: 'My Issues', public: true },
    { path: '/report', icon: AiOutlineForm, label: 'Report Issue', public: true },
  ];

  return (
    <div className="space-y-2 px-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          // Role / visibility check
          if (item.role && !hasRole(currentUser, item.role)) return null;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                active
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-orange-500 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarContent;
