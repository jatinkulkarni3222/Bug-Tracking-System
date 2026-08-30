import React, { useState, useEffect } from 'react';

const StatsSummary = ({ foundUserSub }) => {
  const [stats, setStats] = useState({
    totalBugs: 0,
    openBugs: 0,
    closedBugs: 0,
    highPriority: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = () => {
    fetch('http://localhost:8080/bugs')
      .then((result) => result.json())
      .then((data) => {
        const totalBugs = data.length;
        const openBugs = data.filter(bug => bug.active === true).length;
        const closedBugs = data.filter(bug => bug.active === false).length;
        const highPriority = data.filter(bug => bug.priority === 'high' && bug.active === true).length;

        setStats({
          totalBugs,
          openBugs,
          closedBugs,
          highPriority,
        });
      })
      .catch((error) => console.error('Error fetching stats:', error));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Issues" 
        value={stats.totalBugs} 
        color="from-blue-500 to-blue-600"
        icon="📊"
      />
      <StatCard 
        title="Open Issues" 
        value={stats.openBugs} 
        color="from-orange-500 to-orange-600"
        icon="🔴"
      />
      <StatCard 
        title="Closed Issues" 
        value={stats.closedBugs} 
        color="from-green-500 to-green-600"
        icon="✅"
      />
      <StatCard 
        title="High Priority" 
        value={stats.highPriority} 
        color="from-red-500 to-red-600"
        icon="⚠️"
      />
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div className={`bg-gradient-to-br ${color} rounded-lg shadow-lg p-6 text-white transform transition duration-300 hover:scale-105`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-100 text-sm font-medium">{title}</p>
        <p className="text-4xl font-bold mt-2">{value}</p>
      </div>
      <div className="text-5xl">{icon}</div>
    </div>
  </div>
);

export default StatsSummary;
