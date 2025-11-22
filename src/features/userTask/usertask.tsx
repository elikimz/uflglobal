

// import React, { useState} from "react";
// import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// import { useGetTasksQuery } from "../tasks/taskAPI";
// import {
//   useGetUserTasksQuery,
//   useCompleteUserTaskMutation,
//   useGetAuditAndCompletedTasksQuery,
//   useGetUserEarningsQuery,
// } from "./userTaskAPI";

// interface Task {
//   id: number;
//   level_id: number;
//   app_name: string;
//   app_picture: string;
//   reward: number;
//   is_completed: boolean;
// }

// interface UserTask {
//   id: number;
//   is_completed: boolean;
//   task: Task;
// }

// const UserTasks: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"doing" | "audit" | "completed">(
//     "doing"
//   );
//   const [showTaskList, setShowTaskList] = useState(false);
//   const [installing, setInstalling] = useState<{ [key: number]: boolean }>({});

//   // API Data
//   const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();
//   const {
//     data: userTasks,
//     isLoading: userLoading,
//     refetch: refetchUserTasks,
//   } = useGetUserTasksQuery();
//   const { data: auditAndCompleted, refetch: refetchAudit } =
//     useGetAuditAndCompletedTasksQuery();
//   const { data: earningsData } = useGetUserEarningsQuery();
//   const [completeTask] = useCompleteUserTaskMutation();

//   // Dynamic Earnings
//   const todaysEarnings = earningsData?.todays_earnings || 0;
//   const totalBalance = earningsData?.total_earnings || 0;

//   // Data Processing
//   const userTaskMap: Record<number, UserTask> =
//     userTasks?.reduce((acc: Record<number, UserTask>, ut: UserTask) => {
//       acc[ut.task.id] = ut;
//       return acc;
//     }, {} as Record<number, UserTask>) || ({} as Record<number, UserTask>);

//   const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];

//   // Handlers
//   const handleInstall = (task: Task) => {
//     const user_task_id = userTaskMap[task.id]?.id;
//     if (!user_task_id || installing[user_task_id]) return;

//     setInstalling((prev) => ({ ...prev, [user_task_id]: true }));

//     // Simulate installation
//     setTimeout(() => {
//       completeTask(user_task_id)
//         .unwrap()
//         .then(() => {
//           setTimeout(() => {
//             // Silently refresh data after 4 seconds
//             refetchUserTasks();
//             refetchAudit();
//             setInstalling((prev) => ({ ...prev, [user_task_id]: false }));
//           }, 4000);
//         })
//         .catch(() => {
//           setInstalling((prev) => ({ ...prev, [user_task_id]: false }));
//         });
//     }, 2000); // Simulate 2 seconds for installation
//   };

//   if (allLoading || userLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-yellow-800">Loading...</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-yellow-50 p-4 text-yellow-900">
//       {!showTaskList ? (
//         <>
//           {/* App Grid */}
//           <div className="grid grid-cols-4 gap-4 mb-4">
//             {allTasks?.map((task) => (
//               <div
//                 key={task.id}
//                 className="bg-yellow-100 p-2 rounded-lg shadow flex flex-col items-center"
//               >
//                 <img
//                   src={task.app_picture}
//                   alt={task.app_name}
//                   className="w-12 h-12"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Earnings Cards */}
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div className="bg-yellow-100 p-4 rounded-lg shadow">
//               <p className="text-sm text-yellow-700">Today's earnings</p>
//               <p className="text-xl font-bold">KES {todaysEarnings}</p>
//             </div>
//             <div className="bg-yellow-100 p-4 rounded-lg shadow">
//               <p className="text-sm text-yellow-700">Total balance</p>
//               <p className="text-xl font-bold">KES {totalBalance}</p>
//             </div>
//           </div>

//           {/* Start Task Button */}
//           <div className="bg-yellow-100 p-4 rounded-lg shadow mb-4">
//             <button
//               className="w-full bg-yellow-600 text-white py-2 rounded-lg mt-4"
//               onClick={() => setShowTaskList(true)}
//             >
//               Start Task
//             </button>
//           </div>

//           {/* Important Notice */}
//           <div className="bg-yellow-100 p-4 rounded-lg shadow">
//             <p className="font-bold mb-2 text-yellow-800">Important Notice</p>
//             <p className="text-sm text-yellow-700">
//               Working hours: 00:01-23:59
//             </p>
//             <p className="text-sm text-yellow-700">
//               If you need assistance, please contact your hiring manager!
//             </p>
//           </div>
//         </>
//       ) : (
//         <>
//           {/* Task List Header */}
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               <button
//                 className="p-2 rounded-full hover:bg-yellow-200 transition-colors"
//                 onClick={() => setShowTaskList(false)}
//               >
//                 <ArrowLeftIcon className="h-6 w-6 text-yellow-600" />
//               </button>
//               <h2 className="text-xl font-bold text-yellow-800">Task list</h2>
//             </div>
//             <div className="flex space-x-4">
//               {(["doing", "audit", "completed"] as const).map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-4 py-2 text-yellow-700 ${
//                     activeTab === tab
//                       ? "border-b-2 border-yellow-600 font-bold"
//                       : ""
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Task List Content */}
//           <div>
//             {activeTab === "doing" && (
//               <div className="space-y-4">
//                 {assignedTasks.map((task) => {
//                   const userTask = userTaskMap[task.id];
//                   return (
//                     <div
//                       key={task.id}
//                       className="bg-yellow-100 p-4 rounded-lg shadow flex items-center gap-4"
//                     >
//                       <img
//                         src={task.app_picture}
//                         alt={task.app_name}
//                         className="w-12 h-12"
//                       />
//                       <div className="flex-1">
//                         <p className="font-bold text-yellow-800">
//                           {task.app_name}
//                         </p>
//                         <p className="text-sm text-yellow-700">
//                           KES {task.reward}
//                         </p>
//                       </div>
//                       <button
//                         onClick={() => handleInstall(task)}
//                         disabled={installing[userTask?.id]}
//                         className={`px-4 py-2 rounded-lg text-white ${
//                           installing[userTask?.id]
//                             ? "bg-yellow-400"
//                             : "bg-yellow-600"
//                         }`}
//                       >
//                         {installing[userTask?.id] ? "Installing..." : "Install"}
//                       </button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//             {activeTab === "audit" && (
//               <div className="space-y-4">
//                 {auditAndCompleted?.audit_tasks.map((a: any) => (
//                   <div
//                     key={`audit-${a.id}`}
//                     className="bg-yellow-100 p-4 rounded-lg shadow"
//                   >
//                     <p className="font-bold text-yellow-800">
//                       Audit Task: {a.user_task?.task?.app_name}
//                     </p>
//                     <p className="text-sm text-yellow-700">
//                       KES {a.user_task?.task?.reward}
//                     </p>
//                     <p className="text-xs text-yellow-600">
//                       Temporary audit record
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//             {activeTab === "completed" && (
//               <div className="space-y-4">
//                 {auditAndCompleted?.completed_tasks.map((c: any) => (
//                   <div
//                     key={`completed-${c.id}`}
//                     className="bg-green-50 p-4 rounded-lg shadow"
//                   >
//                     <p className="font-bold text-yellow-800">
//                       Completed Task: {c.user_task?.task?.app_name}
//                     </p>
//                     <p className="text-sm text-yellow-700">
//                       KES {c.user_task?.task?.reward}
//                     </p>
//                     <p className="text-xs text-yellow-600">
//                       Earned: KES {c.reward}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default UserTasks;




import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useGetTasksQuery } from "../tasks/taskAPI";
import {
  useGetUserTasksQuery,
  useCompleteUserTaskMutation,
  useGetAuditAndCompletedTasksQuery,
  useGetUserEarningsQuery,
} from "./userTaskAPI";

interface Task {
  id: number;
  level_id: number;
  app_name: string;
  app_picture: string;
  reward: number;
  is_completed: boolean;
}

interface UserTask {
  id: number;
  is_completed: boolean;
  task: Task;
}

const UserTasks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"doing" | "audit" | "completed">(
    "doing"
  );
  const [showTaskList, setShowTaskList] = useState(true);
  const [installing, setInstalling] = useState<{ [key: number]: boolean }>({});

  // API Data
  const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();
  const {
    data: userTasks,
    isLoading: userLoading,
    refetch: refetchUserTasks,
  } = useGetUserTasksQuery();
  const { data: auditAndCompleted, refetch: refetchAudit } =
    useGetAuditAndCompletedTasksQuery();
  const { data: earningsData } = useGetUserEarningsQuery();
  const [completeTask] = useCompleteUserTaskMutation();

  // Dynamic Earnings
  const todaysEarnings = earningsData?.todays_earnings || 0;
  const totalBalance = earningsData?.total_earnings || 0;

  // Data Processing
  const userTaskMap: Record<number, UserTask> =
    userTasks?.reduce((acc: Record<number, UserTask>, ut: UserTask) => {
      acc[ut.task.id] = ut;
      return acc;
    }, {} as Record<number, UserTask>) || ({} as Record<number, UserTask>);

  const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];

  // Handlers
  const handleInstall = (task: Task) => {
    const user_task_id = userTaskMap[task.id]?.id;
    if (!user_task_id || installing[user_task_id]) return;

    setInstalling((prev) => ({ ...prev, [user_task_id]: true }));

    setTimeout(() => {
      completeTask(user_task_id)
        .unwrap()
        .then(() => {
          setTimeout(() => {
            refetchUserTasks();
            refetchAudit();
            setInstalling((prev) => ({ ...prev, [user_task_id]: false }));
          }, 4000);
        })
        .catch(() => {
          setInstalling((prev) => ({ ...prev, [user_task_id]: false }));
        });
    }, 2000);
  };

  if (allLoading || userLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-yellow-800">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-yellow-50 p-4 text-yellow-900">
      {!showTaskList ? (
        <>
          {/* App Grid */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {allTasks?.map((task) => (
              <div
                key={task.id}
                className="bg-yellow-100 p-2 rounded-lg shadow flex flex-col items-center"
              >
                <img
                  src={task.app_picture}
                  alt={task.app_name}
                  className="w-12 h-12"
                />
              </div>
            ))}
          </div>

          {/* Earnings Cards */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-yellow-100 p-4 rounded-lg shadow">
              <p className="text-sm text-yellow-700">Today's earnings</p>
              <p className="text-xl font-bold">KES {todaysEarnings}</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow">
              <p className="text-sm text-yellow-700">Total balance</p>
              <p className="text-xl font-bold">KES {totalBalance}</p>
            </div>
          </div>

          {/* Start Task Button */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow mb-4">
            <button
              className="w-full bg-yellow-600 text-white py-2 rounded-lg mt-4"
              onClick={() => setShowTaskList(true)}
            >
              Start Task
            </button>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <p className="font-bold mb-2 text-yellow-800">Important Notice</p>
            <p className="text-sm text-yellow-700">
              Working hours: 00:01-23:59
            </p>
            <p className="text-sm text-yellow-700">
              If you need assistance, please contact your hiring manager!
            </p>
          </div>
        </>
      ) : (
        <>
          {/* Task List Header */}
          <div className="mb-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                className="p-2 rounded-full hover:bg-yellow-200 transition-colors"
                onClick={() => setShowTaskList(false)}
              >
                <ArrowLeftIcon className="h-6 w-6 text-yellow-600" />
              </button>
              <h2 className="text-xl font-bold text-yellow-800">Task list</h2>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-yellow-200 mb-4">
              {(["doing", "audit", "completed"] as const).map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-yellow-700 ${
                    activeTab === tab
                      ? "border-b-2 border-yellow-600 font-bold"
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Task List Content */}
          <div>
            {activeTab === "doing" && (
              <div className="space-y-4">
                {assignedTasks.map((task) => {
                  const userTask = userTaskMap[task.id];
                  return (
                    <div
                      key={task.id}
                      className="bg-yellow-100 p-4 rounded-lg shadow flex items-center gap-4"
                    >
                      <img
                        src={task.app_picture}
                        alt={task.app_name}
                        className="w-12 h-12"
                      />
                      <div className="flex-1">
                        <p className="font-bold text-yellow-800">
                          {task.app_name}
                        </p>
                        <p className="text-sm text-yellow-700">
                          KES {task.reward}
                        </p>
                      </div>
                      <button
                        onClick={() => handleInstall(task)}
                        disabled={installing[userTask?.id]}
                        className={`px-4 py-2 rounded-lg text-white ${
                          installing[userTask?.id]
                            ? "bg-yellow-400"
                            : "bg-yellow-600"
                        }`}
                      >
                        {installing[userTask?.id] ? "Installing..." : "Install"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
            {activeTab === "audit" && (
              <div className="space-y-4">
                {auditAndCompleted?.audit_tasks.map((a: any) => (
                  <div
                    key={`audit-${a.id}`}
                    className="bg-yellow-100 p-4 rounded-lg shadow"
                  >
                    <p className="font-bold text-yellow-800">
                      Audit Task: {a.user_task?.task?.app_name}
                    </p>
                    <p className="text-sm text-yellow-700">
                      KES {a.user_task?.task?.reward}
                    </p>
                    <p className="text-xs text-yellow-600">
                      Temporary audit record
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "completed" && (
              <div className="space-y-4">
                {auditAndCompleted?.completed_tasks.map((c: any) => (
                  <div
                    key={`completed-${c.id}`}
                    className="bg-green-50 p-4 rounded-lg shadow"
                  >
                    <p className="font-bold text-yellow-800">
                      Completed Task: {c.user_task?.task?.app_name}
                    </p>
                    <p className="text-sm text-yellow-700">
                      KES {c.user_task?.task?.reward}
                    </p>
                    <p className="text-xs text-yellow-600">
                      Earned: KES {c.reward}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserTasks;
