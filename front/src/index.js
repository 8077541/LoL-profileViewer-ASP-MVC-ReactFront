import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Summoner from "./routes/Summoner";
import Error from "./ErrorPage";

const router = createBrowserRouter([
  {
    exact: true,
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "summoners/:region/:summonerName",
    element: <Summoner />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// </React.StrictMode>
// <React.StrictMode>
