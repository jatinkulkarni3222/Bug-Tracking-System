import TopNavigation from '../TopNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';
import PieChart from '../PieChartDashboard';
import AllWidgets from '../DashboardWidgets';
import { useEffect, useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { getRoles } from '../../utils/auth';
// import { useState } from 'react';

const DashboardContainer = ({ foundUserSub }) => {
  const { currentUser } = useUser();
  const roles = getRoles(currentUser);
  const isAdmin = roles?.includes('admin');
  const isReporter = roles?.includes('reporter');

  return (
    <div className='ml-72 pt-24 pb-8 pr-10 bg-gray-50 dark:bg-gray-950 min-h-screen'>

    <div className='max-w-7xl mx-auto'>

    <div className='mb-8'>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {isAdmin && "Admin Dashboard - Manage all issues and users"}
        {isReporter && "Reporter Dashboard - Track your reported issues"}
        {!isAdmin && !isReporter && "Welcome back! Here's your issue summary"}
      </p>
    </div>

    {/* Role-based widgets */}
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
      {isAdmin && (
        <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2'>Admin Controls</h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>You have full access to all issues, users, and settings.</p>
        </div>
      )}
      
      {isReporter && (
        <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2'>Reporter Access</h3>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>You can report and track issues.</p>
        </div>
      )}
    </div>

    <AllWidgets foundUserSub={foundUserSub}/>
  

   
  

    </div>


  

      
    </div>
  );
};






export default DashboardContainer;
