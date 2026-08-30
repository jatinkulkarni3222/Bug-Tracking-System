import React from 'react';
import { getRoles } from '../../utils/auth';
import { useUser } from '../../contexts/UserContext';

const RoleBadge = () => {
  const { currentUser } = useUser();
  const roles = getRoles(currentUser);
  const primaryRole = roles?.[0] || 'user';

  const roleColors = {
    admin: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    reporter: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    developer: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    manager: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    user: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  };

  const colorClass = roleColors[primaryRole] || roleColors.user;

  return (
    <div className="inline-block">
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}>
        {primaryRole.charAt(0).toUpperCase() + primaryRole.slice(1)}
      </span>
    </div>
  );
};

export default RoleBadge;
