import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


import {RouterProvider} from 'react-router';
import router from './router';
import {ServiceProvider} from './contexts/ServiceContext';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ServiceProvider>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >
                <RouterProvider router={router}>
                </RouterProvider>
            </DevSupport>
        </ServiceProvider>
    </React.StrictMode>
);

