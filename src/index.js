import React from 'react';
import ListView from './views/ListView';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailsView from './views/DetailsView';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ListView />,
  },
  {
    path: "/DetailsView/:id",
    element: <DetailsView />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
