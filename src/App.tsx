import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ErrorPage from "./components/errorpage";

// import AuthPage from "./features/register/register";
import UserDashboard from "./components/userdashboard";
import Deposit from "./features/deposit/deposit";
import AdminDashboard from "./components/admindashboard";
import AdminManageDeposits from "./features/deposit/adminmanagedeposit";
import Levels from "./features/levels/levels";
import AdminManageLevels from "./features/levels/adminmanagelevels";
import MyJobLevels from "./features/usersLevels/leveljob";
import AdminTasks from "./features/tasks/adminTask";
import UserTasks from "./features/userTask/usertask";
import Referrals from "./features/referrals/referrals";
import AdminManageReferrals from "./features/referrals/adminmanagereferal";
import AdminWealthFund from "./features/wealthfund/wealthfundAdmin";
import UserWealthFund from "./features/userWealthfund/userWeathfund";
import AdminManageNews from "./features/news/adminmanagenews";
import UserNews from "./features/news/news";
import Profile from "./features/profile/profile";
import Security from "./pages/security";
import Withdrawal from "./features/withdrawal/withdrawal";
import AdminManageWithdrawal from "./features/withdrawal/adminManageWithdwal";
import Earnings from "./features/earnings/earnings";
import PasswordSetting from "./pages/password";
import Spinner from "./pages/spinner";
import PaymentDetails from "./pages/paymentdetails";
import AdminManageUsers from "./features/profile/adminmanageuser";
import AdminManageContact from "./features/contacts/adminmanagecontacts";
import AdminManageLink from "./features/whatapplinks/adminmanage";
import AdvertisingPosition from "./pages/advitising";
import AdminSettings from "./features/login/adminsettings";
import AdminAnalysis from "./features/earnings/adminanalysis";
import CompanyActivities from "./pages/companyactivity";
import UFLDetails from "./pages/membersbenefit";
// import LoginPage from "./features/login/login";
import AdminManageWallet from "./features/withdrawal/adminupdatewallet";
import AdminResetTasks from "./features/userTask/adminresettasks";
import AdminTotalWithdrawal from "./pages/successifulwithdwal";

import AdminActiveMembers from "./features/profile/adminactiveusers";
import HackerTerminalPage from "./features/register/register";

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/register" replace />,
  },
  {
    path: '/register',
    element: <HackerTerminalPage />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },


  
  {
    path: '/admin/edit-wallet',
    element: <AdminManageWallet />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: '/user/dashboard',
    element: <UserDashboard />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: 'recharge',
    element: <Deposit />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: 'withdraw',
    element: <Withdrawal />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: 'task',
    element: <UserTasks />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: 'levels',
    element: <Levels />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/myjoblevels',
    element: <MyJobLevels />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/referrals',
    element: <Referrals />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: '/finance',
    element: <UserWealthFund />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/company-news',
    element: <UserNews />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/company-activity',
    element: <CompanyActivities />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/member-benefits',
    element: <UFLDetails />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/security',
    element: <Security />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: '/earnings/me',
    element: <Earnings />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: '/change-password',
    element: <PasswordSetting />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/spinner',
    element: <Spinner />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/withdrawal-details',
    element: <PaymentDetails />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/sgg',
    element: <AdvertisingPosition />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/deposits',
    element: <AdminManageDeposits />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/levels',
    element: <AdminManageLevels />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/tasks',
    element: <AdminTasks />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/referrals',
    element: <AdminManageReferrals />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/wealth-funds',
    element: <AdminWealthFund />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/company-news',
    element: <AdminManageNews />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },

  {
    path: '/admin/withdrawals',
    element: <AdminManageWithdrawal />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/users',
    element: <AdminManageUsers />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/contacts',
    element: <AdminManageContact />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/whatsapp-links',
    element: <AdminManageLink />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/setting',
    element: <AdminSettings />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/analysis',
    element: <AdminAnalysis />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/edit-reset-task',
    element: <AdminResetTasks />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },
  {
    path: '/admin/total-successful-withdrawals',
    element: <AdminTotalWithdrawal />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),


  },
  {
    path: '/admin/view-active-members',
    element: <AdminActiveMembers />,
    errorElement: (
      <ErrorPage
        code="🚧"
        message="This section is being crafted to serve you better. Please check back soon!"
      />
    ),
  },


  
  // Catch-all route (for 404)
  {
    path: '*',
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
