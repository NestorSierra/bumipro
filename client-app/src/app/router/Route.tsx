import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import PropertyDashboard from "../../features/property/dashboard/PropertyDashboard";
import HomePage from "../../features/home/Home";
import App from "../layout/App";
import Dashboard from "../../features/dashboard/Dashboard";
import ServerError from "../../features/errors/ServerError";
import NotFound from "./../../features/errors/NotFound";
import PropertyDetails from "../../features/property/details/PropertyDetails";
import LoginForm from "../../users/LoginForm";
import ProfilePage from "../../features/profiles/ProfilePage";
import PropertyPage from "../../features/property/form/PropertyPage";
import ApplicationTable from "../../features/applications/ApplicationTable";
import ApplicationDetails from "../../features/applications/ApplicationDetails";
import RequireAuth from "./RequireAuth";
import MyProperties from "../../features/property/dashboard/MyProperties";
import ApplicationForm from "../../features/applications/ApplicationForm";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "applications", element: <ApplicationTable /> },
          {
            path: "applications/create/:propertyId",
            element: <ApplicationForm />,
          },
          {
            path: "applications/manage/:id",
            element: <ApplicationForm />,
          },
          {
            path: "applications/:referenceNumber",
            element: <ApplicationDetails />,
          },
          { path: "dashboard", element: <Dashboard /> },
          { path: "myProperties", element: <MyProperties /> },
          { path: "properties", element: <PropertyDashboard /> },
          { path: "properties/:id", element: <PropertyDetails /> },
          { path: "createProperty", element: <PropertyPage /> },

          { path: "properties/manage/:id", element: <PropertyPage /> },
          { path: "profiles/:username", element: <ProfilePage /> },
        ],
      },
      { path: "login", element: <LoginForm /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
  { path: "server-error", element: <ServerError /> },
];

export const router = createBrowserRouter(routes);
