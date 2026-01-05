import React, { useContext, useEffect, useState } from 'react'
import Login from './component/Auth/login'
import EmployeeDashBoard from './component/dashBoard/EmployeeDashBoard'
import TaskListNumbers from './component/others/TaskListNumbers'
import TaskList from './component/Tasklist/TaskList'
import AdminDashBoard from './component/dashBoard/AdminDashBoard'
import { AuthContext } from '@/context/AuthProvider'
// import admin from './data/admin';
// import employees from './data/employees';

const App = () => {

const { user, userData, logout } = useContext(AuthContext)


if (!user) {
    return <Login />
  }

  if (user === "admin") {
    return <AdminDashBoard changeUser={logout} data={userData} />
  }

  return <EmployeeDashBoard changeUser={logout} data={userData} />
}


export default App