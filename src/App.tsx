import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ErrorPage from "./components/errorpage";

import AuthPage from "./features/register/register";
import UserDashboard from "./components/userdashboard";
import Deposit from "./features/deposit/deposit";
import AdminDashboard from "./components/admindashboard";
import AdminManageDeposits from "./features/deposit/adminmanagedeposit";
import Levels from "./features/levels/levels";
import AdminManageLevels from "./features/levels/adminmanagelevels";
import MyJobLevels from "./features/usersLevels/leveljob";


// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" replace />,
  },
  {
    path: "/register",
    element: <AuthPage />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: "/user/dashboard",
    element: <UserDashboard />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: "deposit",
    element: <Deposit />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: "levels",
    element: <Levels />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: "/myjoblevels",
    element: <MyJobLevels />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: "/admin/deposits",
    element: <AdminManageDeposits />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: "/admin/levels",
    element: <AdminManageLevels />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  // Catch-all route (for 404)
  {
    path: "*",
    element: (
      <ErrorPage
        code="🚧"
        message="We’re working on this page to give you the best experience. Stay tuned!"
      />
    ),
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
