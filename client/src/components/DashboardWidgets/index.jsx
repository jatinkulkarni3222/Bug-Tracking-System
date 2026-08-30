import { useState, useEffect } from "react";
import { filterByPriority, filterByUser, filterForNoAssignees } from "../../services/SortAndFilter";
import { PieChart } from "react-minimal-pie-chart";



const AllWidgets = ({ foundUserSub }) => {


    

    const [allBugs, setAllBugs] = useState([]);
    const [allBugsCount, setAllBugsCount] = useState(0);
    const [myBugsCount, setMyBugsCount] = useState(0);
    const [unassignedBugsCount, setUnassignedBugsCount] = useState(0);
    const [highBugsCount, setHighBugsCount] = useState(0);
    const [mediumBugsCount, setMediumBugsCount] = useState(0);
    const [lowBugsCount, setLowBugsCount] = useState(0);

    const getAllBugs = () => {
        fetch("http://localhost:8080/bugs")
        .then((result) => result.json())
        .then((data) => {
          setAllBugs(data);
          setAllBugsCount(data.length);
          setMyBugsCount(filterByUser(data, foundUserSub).length);
          setUnassignedBugsCount(filterForNoAssignees(data).length);
          setHighBugsCount(filterByPriority(data, "high").length);
          setMediumBugsCount(filterByPriority(data, "medium").length);
          setLowBugsCount(filterByPriority(data, "low").length);
        });
    };

    useEffect(() => {
        getAllBugs();
    }, []);

      
    return ( 

        <div className="flex flex-col gap-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TotalTickets allBugsCount={allBugsCount}/>
        <MyTickets myBugsCount={myBugsCount}/>
        <UnassignedTickets unassignedBugsCount={unassignedBugsCount}/>
       </div>

       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Priority Distribution</h3>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 flex justify-center">
            <PieChart
              data={[
                { title: 'High', value: highBugsCount, color: '#c62125' },
                { title: 'Medium', value: mediumBugsCount, color: '#4486f5' },
                { title: 'Low', value: lowBugsCount, color: '#1d946f' }
              ]}
              viewBoxSize={[100, 100]}
              radius={20}
              center={[50, 30]}
            /> 
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: '#c62125'}}></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">High Priority</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{highBugsCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: '#4486f5'}}></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Medium Priority</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mediumBugsCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{backgroundColor: '#1d946f'}}></div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Low Priority</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{lowBugsCount}</p>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
     )}
 

const TotalTickets = ({ allBugsCount }) => {
    return ( 
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="card-title">Total Open Tickets</p>
            <p className="text-5xl font-bold text-orange-600 dark:text-orange-400 mt-2">{allBugsCount}</p>
          </div>
          <div className="text-4xl opacity-10 group-hover:opacity-20 transition-opacity">#</div>
        </div>
        <div className="mt-4 h-1 bg-gradient-orange rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
      </div>
    );
    }

const MyTickets = ({ myBugsCount }) => {
    return ( 
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="card-title">My Open Tickets</p>
            <p className="text-5xl font-bold text-blue-600 dark:text-blue-400 mt-2">{myBugsCount}</p>
          </div>
          <div className="text-4xl opacity-10 group-hover:opacity-20 transition-opacity">👤</div>
        </div>
        <div className="mt-4 h-1 bg-blue-500 rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
      </div>
    );
    }

const UnassignedTickets = ({ unassignedBugsCount }) => {
    return ( 
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="card-title">Unassigned Tickets</p>
            <p className="text-5xl font-bold text-purple-600 dark:text-purple-400 mt-2">{unassignedBugsCount}</p>
          </div>
          <div className="text-4xl opacity-10 group-hover:opacity-20 transition-opacity">⚠️</div>
        </div>
        <div className="mt-4 h-1 bg-purple-500 rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
      </div>
    );
    }

 
  




export default AllWidgets;