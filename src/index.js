import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import { RouterProvider } from 'react-router';
import router from './router';
import { ServiceProvider } from './contexts/ServiceContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ServiceProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </ServiceProvider>
  </React.StrictMode>
);

