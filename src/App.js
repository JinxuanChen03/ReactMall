import './App.css';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
function App () {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
