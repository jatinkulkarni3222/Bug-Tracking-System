import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasRole } from '../../utils/auth';
import { useUser } from '../../contexts/UserContext';

const RequireRole = ({ children, role }) => {
  const { currentUser } = useUser();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (!hasRole(currentUser, role)) {
    return (
      <div className="ml-72 pt-24 pr-10 pb-8 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Not authorized</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default RequireRole;
