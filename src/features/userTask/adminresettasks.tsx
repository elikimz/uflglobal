// import React, { useState } from "react";
// import { 
//   useAdminCompleteAllTasksMutation, 
//   useAdminResetAllTasksMutation 
// } from "../userTask/userTaskAPI";

// const AdminResetTasks: React.FC = () => {
//   const [loadingComplete, setLoadingComplete] = useState(false);
//   const [loadingReset, setLoadingReset] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);

//   const [adminCompleteAllTasks] = useAdminCompleteAllTasksMutation();
//   const [adminResetAllTasks] = useAdminResetAllTasksMutation();

//   const handleCompleteAll = async () => {
//     if (!window.confirm("Are you sure you want to mark ALL user tasks as completed?")) return;

//     try {
//       setLoadingComplete(true);
//       const res: any = await adminCompleteAllTasks().unwrap();
//       setMessage(`${res.updated_tasks} tasks marked as completed`);
//       console.log(res);
//     } catch (error: any) {
//       console.error(error);
//       setMessage("Failed to complete all tasks");
//     } finally {
//       setLoadingComplete(false);
//     }
//   };

//   const handleResetAll = async () => {
//     if (!window.confirm("Are you sure you want to reset ALL completed tasks to pending?")) return;

//     try {
//       setLoadingReset(true);
//       const res: any = await adminResetAllTasks().unwrap();
//       setMessage(`${res.updated_tasks} tasks reset to pending`);
//       console.log(res);
//     } catch (error: any) {
//       console.error(error);
//       setMessage("Failed to reset tasks");
//     } finally {
//       setLoadingReset(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
//         <h1 className="text-2xl font-bold mb-4">Admin Task Management</h1>
//         <p className="text-gray-600 mb-6">
//           From here, you can mark all user tasks as completed or reset completed tasks to pending.
//           Use these actions carefully—they affect all users.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4">
//           {/* Complete All Tasks */}
//           <button
//             onClick={handleCompleteAll}
//             disabled={loadingComplete}
//             className={`flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded shadow transition duration-200 ${
//               loadingComplete ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loadingComplete ? "Processing..." : "Complete All Tasks"}
//           </button>

//           {/* Reset All Tasks */}
//           <button
//             onClick={handleResetAll}
//             disabled={loadingReset}
//             className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded shadow transition duration-200 ${
//               loadingReset ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             {loadingReset ? "Processing..." : "Reset All Tasks"}
//           </button>
//         </div>

//         {/* Optional: Inline message */}
//         {message && (
//           <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 text-blue-700 rounded">
//             {message}
//           </div>
//         )}

//         {/* Warning Info Section */}
//         <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded">
//           <strong>Warning:</strong> These actions are irreversible. Make sure you have confirmed with the team before executing.
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminResetTasks;



import React, { useState, useEffect } from "react";
import { 
  useAdminCompleteAllTasksMutation, 
  useAdminResetAllTasksMutation 
} from "../userTask/userTaskAPI";

const AdminResetTasks: React.FC = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [showConfirmComplete, setShowConfirmComplete] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const [adminCompleteAllTasks] = useAdminCompleteAllTasksMutation();
  const [adminResetAllTasks] = useAdminResetAllTasksMutation();

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCompleteAll = async () => {
    try {
      setLoadingComplete(true);
      const res: any = await adminCompleteAllTasks().unwrap();
      setMessage({ type: "success", text: `${res.updated_tasks} tasks marked as completed` });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: error?.data?.detail || "Failed to complete all tasks" });
    } finally {
      setLoadingComplete(false);
      setShowConfirmComplete(false);
    }
  };

  const handleResetAll = async () => {
    try {
      setLoadingReset(true);
      const res: any = await adminResetAllTasks().unwrap();
      setMessage({ type: "success", text: `${res.updated_tasks} tasks reset to pending` });
    } catch (error: any) {
      console.error(error);
      setMessage({ type: "error", text: error?.data?.detail || "Failed to reset tasks" });
    } finally {
      setLoadingReset(false);
      setShowConfirmReset(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Task Management</h1>
        <p className="text-gray-600 mb-6">
          From here, you can mark all user tasks as completed or reset completed tasks to pending.
          Use these actions carefully—they affect all users.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Complete All Tasks */}
          <button
            onClick={() => setShowConfirmComplete(true)}
            disabled={loadingComplete}
            className={`flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded shadow transition duration-200 flex justify-center items-center gap-2 ${
              loadingComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadingComplete && <span className="loader border-white"></span>}
            {loadingComplete ? "Processing..." : "Complete All Tasks"}
          </button>

          {/* Reset All Tasks */}
          <button
            onClick={() => setShowConfirmReset(true)}
            disabled={loadingReset}
            className={`flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded shadow transition duration-200 flex justify-center items-center gap-2 ${
              loadingReset ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadingReset && <span className="loader border-white"></span>}
            {loadingReset ? "Processing..." : "Reset All Tasks"}
          </button>
        </div>

        {/* SaaS-style Success/Error Banner */}
        {message && (
          <div
            className={`mt-4 p-3 rounded border-l-4 ${
              message.type === "success"
                ? "bg-green-50 border-green-400 text-green-700"
                : "bg-red-50 border-red-400 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Warning Info Section */}
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 rounded">
          <strong>Warning:</strong> These actions are irreversible. Make sure you have confirmed with the team before executing.
        </div>
      </div>

      {/* SaaS-style Confirmation Modal */}
      {showConfirmComplete && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
            <p className="mb-6">
              Are you sure you want to <strong>mark all tasks as completed</strong>? This action affects all users.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmComplete(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteAll}
                disabled={loadingComplete}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
              >
                {loadingComplete && <span className="loader border-white"></span>}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmReset && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Action</h2>
            <p className="mb-6">
              Are you sure you want to <strong>reset all completed tasks to pending</strong>? This action affects all users.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAll}
                disabled={loadingReset}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
              >
                {loadingReset && <span className="loader border-white"></span>}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader CSS */}
      <style>{`
        .loader {
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
};

export default AdminResetTasks;
