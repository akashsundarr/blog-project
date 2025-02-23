import React from "react";
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './lib/router';
import "./index.css"; // Ensure fonts are applied globally


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router}/>
  </React.StrictMode>
);
