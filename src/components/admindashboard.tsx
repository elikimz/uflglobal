

// // AdminDashboard.tsx
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
//   ClipboardDocumentListIcon,
//   UsersIcon,
//   TrophyIcon,
//   UserPlusIcon,
//   ChartBarIcon,
//   Cog6ToothIcon,
//   ExclamationCircleIcon,
//   CheckCircleIcon,
//   CurrencyDollarIcon,
//   NewspaperIcon,
//   ChatBubbleLeftEllipsisIcon, // <-- for Company News
// } from "@heroicons/react/24/solid";

// const AdminDashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const [message] = useState<{
//     type: "error" | "success";
//     text: string;
//   } | null>(null);

//   const sections = [
//     {
//       id: "withdrawals",
//       title: "Manage Withdrawals",
//       icon: <ArrowDownTrayIcon className="h-6 w-6" />,
//       description: "Approve or reject user withdrawal requests.",
//       route: "/admin/withdrawals",
//     },
//     {
//       id: "deposits",
//       title: "Manage Deposits",
//       icon: <ArrowUpTrayIcon className="h-6 w-6" />,
//       description: "Review and confirm user deposits.",
//       route: "/admin/deposits",
//     },
//     {
//       id: "tasks",
//       title: "Manage Tasks",
//       icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
//       description: "Create, edit, or delete tasks for users.",
//       route: "/admin/tasks",
//     },
//     {
//       id: "levels",
//       title: "Manage Levels",
//       icon: <TrophyIcon className="h-6 w-6" />,
//       description: "Set up and configure user levels and rewards.",
//       route: "/admin/levels",
//     },
//     {
//       id: "users",
//       title: "Manage Users",
//       icon: <UsersIcon className="h-6 w-6" />,
//       description: "View, edit, or suspend user accounts.",
//       route: "/admin/users",
//     },
//     {
//       id: "referrals",
//       title: "Manage Referrals",
//       icon: <UserPlusIcon className="h-6 w-6" />,
//       description: "Track and manage user referrals and bonuses.",
//       route: "/admin/referrals",
//     },
//     {
//       id: "wealthfunds",
//       title: "Manage Wealth Funds",
//       icon: <CurrencyDollarIcon className="h-6 w-6" />,
//       description: "Create, update, and delete wealth funds.",
//       route: "/admin/wealth-funds",
//     },
//     {
//       id: "companynews",
//       title: "Manage Company News",
//       icon: <NewspaperIcon className="h-6 w-6" />,
//       description: "Create, update, and delete company news.",
//       route: "/admin/company-news",
//     }, // <-- new section
//     {
//       id: "contacts",
//       title: "Contacts ",
//       icon: <ChartBarIcon className="h-6 w-6" />,
//       description: " view contacts.",
//       route: "/admin/contacts",
//     },
//     // {
//     //   id: "settings",
//     //   title: "System Settings",
//     //   icon: <Cog6ToothIcon className="h-6 w-6" />,
//     //   description: "Configure system-wide settings and preferences.",
//     //   route: "/admin/settings",
//     // },
//     {
//       id: "whatsapplinks",
//       title: "Manage WhatsApp Links",
//       icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
//       description:
//         "Create, update, and delete WhatsApp, group, and hiring manager links.",
//       route: "/admin/whatsapp-links",
//     },
//   ];

//   const handleSectionClick = (route: string) => {
//     navigate(route);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="relative min-h-screen w-full text-white px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 overflow-x-hidden"
//     >
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
//           <Cog6ToothIcon className="h-8 w-8 text-indigo-300" />
//           Admin Dashboard
//         </h1>
//         <p className="text-indigo-200 text-sm">Manage your platform efficiently</p>
//       </div>

//       {/* Sections Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
//         {sections.map((section) => (
//           <motion.button
//             key={section.id}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => handleSectionClick(section.route)}
//             className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-xl transition-colors hover:ring-2 hover:ring-indigo-400"
//           >
//             <div className="flex items-center gap-4">
//               <div className="p-3 rounded-xl bg-indigo-500/20">{section.icon}</div>
//               <div className="text-left">
//                 <h3 className="text-lg font-semibold">{section.title}</h3>
//                 <p className="text-sm text-indigo-200 mt-1">{section.description}</p>
//               </div>
//             </div>
//           </motion.button>
//         ))}
//       </div>

//       {/* Inline Message */}
//       {message && (
//         <div
//           className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto p-3 rounded-xl flex items-center gap-2 z-50 ${
//             message.type === "error" ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
//           }`}
//         >
//           {message.type === "error" ? <ExclamationCircleIcon className="h-5 w-5" /> : <CheckCircleIcon className="h-5 w-5" />}
//           <span>{message.text}</span>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default AdminDashboard;




import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  TrophyIcon,
  UserPlusIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [message] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const sections = [
    {
      id: "withdrawals",
      title: "Manage Withdrawals",
      icon: <ArrowDownTrayIcon className="h-6 w-6" />,
      description: "Approve or reject user withdrawal requests.",
      route: "/admin/withdrawals",
    },
    {
      id: "deposits",
      title: "Manage Deposits",
      icon: <ArrowUpTrayIcon className="h-6 w-6" />,
      description: "Review and confirm user deposits.",
      route: "/admin/deposits",
    },
    {
      id: "tasks",
      title: "Manage Tasks",
      icon: <ClipboardDocumentListIcon className="h-6 w-6" />,
      description: "Create, edit, or delete tasks for users.",
      route: "/admin/tasks",
    },
    {
      id: "levels",
      title: "Manage Levels",
      icon: <TrophyIcon className="h-6 w-6" />,
      description: "Set up and configure user levels and rewards.",
      route: "/admin/levels",
    },
    {
      id: "users",
      title: "Manage Users",
      icon: <UsersIcon className="h-6 w-6" />,
      description: "View, edit, or suspend user accounts.",
      route: "/admin/users",
    },
    {
      id: "referrals",
      title: "Manage Referrals",
      icon: <UserPlusIcon className="h-6 w-6" />,
      description: "Track and manage user referrals and bonuses.",
      route: "/admin/referrals",
    },
    {
      id: "wealthfunds",
      title: "Manage Wealth Funds",
      icon: <CurrencyDollarIcon className="h-6 w-6" />,
      description: "Create, update, and delete wealth funds.",
      route: "/admin/wealth-funds",
    },
    {
      id: "companynews",
      title: "Manage Company News",
      icon: <NewspaperIcon className="h-6 w-6" />,
      description: "Create, update, and delete company news.",
      route: "/admin/company-news",
    },
    {
      id: "contacts",
      title: "Contacts",
      icon: <ChartBarIcon className="h-6 w-6" />,
      description: "View contacts.",
      route: "/admin/contacts",
    },
    {
      id: "whatsapplinks",
      title: "Manage WhatsApp Links",
      icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
      description:
        "Create, update, and delete WhatsApp, group, and hiring manager links.",
      route: "/admin/whatsapp-links",
    },
  ];

  const handleSectionClick = (route: string) => {
    navigate(route);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full text-white px-4 py-6 bg-gradient-to-b from-gray-900 via-indigo-900 to-gray-950 overflow-x-hidden"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 flex justify-center items-center gap-2">
          <Cog6ToothIcon className="h-8 w-8 text-indigo-300" />
          Admin Dashboard
        </h1>
        <p className="text-indigo-200 text-sm">
          Manage Users, Transactions, Investments, and More
        </p>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSectionClick(section.route)}
            className="bg-indigo-600 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg"
          >
            <div className="mb-2 text-white">{section.icon}</div>
            <h3 className="text-white text-sm font-medium text-center">
              {section.title}
            </h3>
          </motion.button>
        ))}
      </div>

      {/* Inline Message */}
      {message && (
        <div
          className={`fixed bottom-4 left-4 right-4 max-w-md mx-auto p-3 rounded-xl flex items-center gap-2 z-50 ${
            message.type === "error"
              ? "bg-red-500/20 text-red-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {message.type === "error" ? (
            <ExclamationCircleIcon className="h-5 w-5" />
          ) : (
            <CheckCircleIcon className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
