import DashboardContainer from './components/DashboardContainer';
import SideBar from './components/SideBar';
import TopNavigation from './components/TopNavigation'
import React, { useEffect, useState } from 'react';
import Loading from './components/Loading';
import Login from './components/Auth/Login';
import BugTable from './components/BugContainer/BugTable';
import RequireRole from './components/Auth/RequireRole';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyBugs from './components/BugContainer/MyBugs'
import ReportBugContainer from './components/ReportBugContainer';
import { useUser } from './contexts/UserContext';

function App() {

  const { currentUser } = useUser();
  


  if (!currentUser) {
    return <Login />
  }

  return (
    <>
      <Router>
        <TopNavigation />
        <SideBar />
        <Routes>
          <Route exact path='/' element={<DashboardContainer foundUserSub={currentUser?.username}/>} />
          <Route exact path='bugs' element={
            <RequireRole role='admin'>
              <BugTable />
            </RequireRole>
          } />
          <Route exact path='mybugs' element={<MyBugs foundUserSub={currentUser?.username} />} />
          <Route exact path='report' element={<ReportBugContainer />} />
        </Routes>
    </Router>
  </>
  );
}

export default App;