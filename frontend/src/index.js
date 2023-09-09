import React from "react";
import ReactDOM from "react-dom/client"; // Import the ReactDOM library for rendering React components into the DOM
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import necessary components and functions from react-router-dom

import "./index.css"; // Import a CSS file for styling the application
import App from "./App"; // Import the App component
import Profile, { loader as userLoader } from './user/Profile'; // Import the Profile component and its loader function from the user directory
import Repo, { loader as repoLoader } from './repo/Repo'; // Import the Repo component and its loader function from the repo directory
import reportWebVitals from "./reportWebVitals"; // Import the reportWebVitals function

// Create a router using createBrowserRouter and an array of route objects
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Render the App component when the path is accessed "/"
  },
  {
    path: '/user/:username',
    loader: userLoader, // Use the userLoader function to fetch data before rendering the component
    element: <Profile />, // Render the Profile component when the path is accessed "/user/:username"
  },
  {
    path: '/repos/:username/:reponame',
    loader: repoLoader, // Use the repoLoader function to fetch data before rendering the component
    element: <Repo />, // Render the Repo component when the path is accessed "/repos/:username/:reponame"
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root")); // Obtain the root element where the React application will be rendered
root.render(
  <React.StrictMode>
    <RouterProvider router={router} /> // Wrap the RouterProvider component with StrictMode to enable additional React checks and warnings
  </React.StrictMode>
);

// Call the reportWebVitals function to start measuring performance metrics in the application
reportWebVitals();