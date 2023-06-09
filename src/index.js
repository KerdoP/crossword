import React from 'react';
import ListView from './views/ListView';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsView from './views/DetailsView';
import { CreateView } from './views/CreateView';
import EditView from './views/EditView';

const router = createBrowserRouter([
    {
        path: "/",
        element: <ListView />,
    },
    {
        path: "/Details/:id",
        element: <DetailsView />,
    },
    {
        path: "/Create",
        element: <CreateView />,
    },
    {
        path: "/Edit/:id",
        element: <EditView />
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
