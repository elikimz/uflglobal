import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ErrorPage from "./components/errorpage";
import Register from "./features/register/register";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" replace />,
  },
  {
    path: "/register",
    element: <Register />,
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
