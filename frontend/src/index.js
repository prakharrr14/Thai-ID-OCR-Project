import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Home from './pages/Home';
import Show from './pages/Show';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Update from './pages/Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/citizens/show",
    element: <Show/>,
  },
  {
    path: "/citizens/update",
    element: <Update/>,
  },
  {
    path: "/citizens/delete",
    element: <div>delete</div>,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
