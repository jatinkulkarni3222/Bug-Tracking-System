import React, { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useUser } from '../../contexts/UserContext';

const Login = () => {
  const { login } = useUser();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    fetch('http://192.168.31.130:8080/users')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleLogin = () => {
    const user = users.find(u => u.username === selectedUser);
    if (user) {
      login(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 right-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800">
          {/* Logo & Branding */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                <FaLock className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
              bugtracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Issue Tracking System</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Select a user to continue</p>
          </div>

          {/* User Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select User
            </label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="">Choose a user...</option>
              {users.map(user => (
                <option key={user.id} value={user.username}>
                  {user.name} ({user.role})
                </option>
              ))}
            </select>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!selectedUser}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            Continue
          </button>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-500">
              bugtracker v1.0 • Issue Management System
            </p>
          </div>
        </div>

        {/* Company Info Card */}
        <div className="mt-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            Role-based access control enabled. Your dashboard will reflect your assigned role and permissions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
