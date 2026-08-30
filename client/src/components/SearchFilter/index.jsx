import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handlePriorityFilter = (e) => {
    const value = e.target.value;
    setFilterPriority(value);
    onFilter({ priority: value, status: filterStatus });
  };

  const handleStatusFilter = (e) => {
    const value = e.target.value;
    setFilterStatus(value);
    onFilter({ priority: filterPriority, status: value });
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilterPriority('all');
    setFilterStatus('all');
    onSearch('');
    onFilter({ priority: 'all', status: 'all' });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Search & Filter Issues</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600">
            <FaSearch className="text-orange-500 mr-3" />
            <input
              type="text"
              placeholder="Search by description..."
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1 bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Priority Filter */}
        <select
          value={filterPriority}
          onChange={handlePriorityFilter}
          className="bg-white dark:bg-gray-800 border-2 border-orange-500 dark:border-orange-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 font-medium cursor-pointer hover:border-orange-600 transition"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>

        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={handleStatusFilter}
          className="bg-white dark:bg-gray-800 border-2 border-orange-500 dark:border-orange-600 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 font-medium cursor-pointer hover:border-orange-600 transition"
        >
          <option value="all">All Status</option>
          <option value="open">Open Issues</option>
          <option value="closed">Closed Issues</option>
        </select>
      </div>

      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition duration-300 ease-in-out shadow-md"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFilter;
