


// import React, { useState } from "react";
// import { useGetTasksQuery } from "../tasks/taskAPI";
// import {
//   useGetUserTasksQuery,
//   useCompleteUserTaskMutation,
//   useGetAuditAndCompletedTasksQuery,
// } from "./userTaskAPI";
// import { CheckCircle } from "lucide-react";

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
//   const [showAssigned, setShowAssigned] = useState(false);

//   // All tasks
//   const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();

//   // User tasks
//   const {
//     data: userTasks,
//     isLoading: userLoading,
//     refetch: refetchUserTasks,
//   } = useGetUserTasksQuery();

//   // Completed + Audit tasks
//   const { data: auditAndCompleted, refetch: refetchAudit } =
//     useGetAuditAndCompletedTasksQuery();

//   const [completeTask] = useCompleteUserTaskMutation();
//   const [downloading, setDownloading] = useState<{ [key: number]: number }>({});
//   const [, setSuccessMessage] = useState<{ [key: number]: boolean }>({});

//   const userTaskMap =
//     userTasks?.reduce((acc, ut) => {
//       acc[ut.task.id] = ut;
//       return acc;
//     }, {} as Record<number, UserTask>) || {};

//   const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];
//   const availableTasks =
//     allTasks?.filter((t: Task) => !userTaskMap[t.id]) || [];

//   const completedCount = Object.values(userTaskMap).filter(
//     (ut) => ut.is_completed
//   ).length;

//   const handleDownload = (task: Task) => {
//     const user_task_id = userTaskMap[task.id]?.id;
//     if (!user_task_id || downloading[user_task_id]) return;

//     setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));

//     let progress = 0;
//     const interval = setInterval(() => {
//       progress += Math.floor(Math.random() * 10) + 5;
//       if (progress >= 100) progress = 100;

//       setDownloading((prev) => ({ ...prev, [user_task_id]: progress }));

//       if (progress >= 100) {
//         clearInterval(interval);
//         completeTask(user_task_id)
//           .unwrap()
//           .then(() => {
//             setSuccessMessage((prev) => ({ ...prev, [user_task_id]: true }));
//             refetchUserTasks();
//             refetchAudit(); // refetch audit/completed to reflect new data
//             setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));

//             setTimeout(() => {
//               setSuccessMessage((prev) => ({ ...prev, [user_task_id]: false }));
//             }, 8000);
//           })
//           .catch(() =>
//             setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }))
//           );
//       }
//     }, 300);
//   };

//   if (allLoading || userLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-[#3B82F6]">Loading...</p>
//       </div>
//     );

//   return (
//     <div className="p-4 bg-gradient-to-b from-[#87CEEB] to-[#1E90FF] min-h-screen">
//       <h2 className="text-2xl font-bold text-white text-center mb-4">
//         Task Center
//       </h2>

//       <div className="flex justify-center mb-5">
//         <button
//           className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow"
//           onClick={() => setShowAssigned(!showAssigned)}
//         >
//           {showAssigned ? "View Available Apps" : "My Tasks"}
//         </button>
//       </div>

//       {!showAssigned && (
//         <div>
//           <h3 className="text-xl font-bold text-white mb-3">Available Apps</h3>
//           <div className="grid grid-cols-3 gap-4">
//             {availableTasks.map((task: Task) => (
//               <div
//                 key={task.id}
//                 className="bg-white p-3 shadow rounded-xl flex justify-center"
//               >
//                 <img
//                   src={task.app_picture}
//                   className="w-20 h-20 rounded-lg object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {showAssigned && (
//         <div>
//           <h3 className="text-xl font-bold text-white mb-3">
//             My Assigned Apps
//           </h3>

//           <div className="bg-white p-4 rounded-lg shadow mb-4">
//             <p className="font-bold mb-1">My Task Progress</p>
//             <p className="text-sm text-gray-600">
//               {completedCount} / {assignedTasks.length}
//             </p>
//             <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
//               <div
//                 className="bg-blue-600 h-2.5 rounded-full"
//                 style={{
//                   width: `${
//                     assignedTasks.length > 0
//                       ? (completedCount / assignedTasks.length) * 100
//                       : 0
//                   }%`,
//                 }}
//               ></div>
//             </div>
//           </div>

//           {/* Assigned tasks */}
//           <div className="grid grid-cols-1 gap-4">
//             {assignedTasks.map((task: Task) => {
//               const userTask = userTaskMap[task.id];
//               const isCompleted = userTask?.is_completed;

//               return (
//                 <div
//                   key={task.id}
//                   className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
//                 >
//                   <img
//                     src={task.app_picture}
//                     className="w-16 h-16 rounded-lg object-cover"
//                   />
//                   <div className="flex-1">
//                     <p className="font-bold">{task.app_name}</p>
//                     <p className="text-sm text-gray-600">KES {task.reward}</p>

//                     {isCompleted ? (
//                       <p className="text-green-500 text-sm flex items-center gap-1 mt-1">
//                         <CheckCircle size={14} /> Completed
//                       </p>
//                     ) : (
//                       <button
//                         onClick={() => handleDownload(task)}
//                         className="bg-blue-500 text-white px-4 py-1 rounded text-sm mt-1"
//                       >
//                         {downloading[userTask?.id]
//                           ? `${downloading[userTask?.id]}%`
//                           : "Start"}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Audit + Completed tasks */}
//           {auditAndCompleted && (
//             <div className="mt-6">
//               <h3 className="text-xl font-bold text-white mb-3">
//                 Audit & Completed Tasks
//               </h3>
//               <div className="grid grid-cols-1 gap-4">
//                 {auditAndCompleted.audit_tasks.map((a: any) => (
//                   <div
//                     key={`audit-${a.id}`}
//                     className="bg-yellow-100 p-3 rounded shadow"
//                   >
//                     <p className="font-semibold">
//                       Audit Task: {a.user_task?.task?.app_name}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       KES {a.user_task?.task?.reward}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Temporary audit record
//                     </p>
//                   </div>
//                 ))}

//                 {auditAndCompleted.completed_tasks.map((c: any) => (
//                   <div
//                     key={`completed-${c.id}`}
//                     className="bg-green-100 p-3 rounded shadow"
//                   >
//                     <p className="font-semibold">
//                       Completed Task: {c.user_task?.task?.app_name}
//                     </p>
//                     <p className="text-sm text-gray-700">
//                       KES {c.user_task?.task?.reward}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Earned: KES {c.reward}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       <div className="h-16"></div>
//     </div>
//   );
// };

// export default UserTasks;







import React, { useState } from "react";
import { useGetTasksQuery } from "../tasks/taskAPI";
import {
  useGetUserTasksQuery,
  useCompleteUserTaskMutation,
  useGetAuditAndCompletedTasksQuery,
} from "./userTaskAPI";
import { CheckCircle } from "lucide-react";

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
  const [showAssigned, setShowAssigned] = useState(false);

  // All tasks
  const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();

  // User tasks
  const {
    data: userTasks,
    isLoading: userLoading,
    refetch: refetchUserTasks,
  } = useGetUserTasksQuery();

  // Completed + Audit tasks
  const { data: auditAndCompleted, refetch: refetchAudit } =
    useGetAuditAndCompletedTasksQuery();

  const [completeTask] = useCompleteUserTaskMutation();
  const [downloading, setDownloading] = useState<{ [key: number]: number }>({});
  const [, setSuccessMessage] = useState<{ [key: number]: boolean }>({});

  const userTaskMap: Record<number, UserTask> =
    userTasks?.reduce((acc: Record<number, UserTask>, ut: UserTask) => {
      acc[ut.task.id] = ut;
      return acc;
    }, {} as Record<number, UserTask>) || ({} as Record<number, UserTask>);

  const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];
  const availableTasks =
    allTasks?.filter((t: Task) => !userTaskMap[t.id]) || [];

  const completedCount = Object.values(userTaskMap).filter(
    (ut) => ut.is_completed
  ).length;

  const handleDownload = (task: Task) => {
    const user_task_id = userTaskMap[task.id]?.id;
    if (!user_task_id || downloading[user_task_id]) return;
    setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) progress = 100;
      setDownloading((prev) => ({ ...prev, [user_task_id]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        completeTask(user_task_id)
          .unwrap()
          .then(() => {
            setSuccessMessage((prev) => ({ ...prev, [user_task_id]: true }));
            refetchUserTasks();
            refetchAudit();
            setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
            setTimeout(() => {
              setSuccessMessage((prev) => ({ ...prev, [user_task_id]: false }));
            }, 8000);
          })
          .catch(() =>
            setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }))
          );
      }
    }, 300);
  };

  if (allLoading || userLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-yellow-800">Loading...</p>
      </div>
    );

  return (
    <div className="p-4 bg-yellow-50 min-h-screen">
      <h2 className="text-2xl font-bold text-yellow-900 text-center mb-4">
        Task Center
      </h2>
      <div className="flex justify-center mb-5">
        <button
          className="bg-yellow-100 text-yellow-800 font-bold px-6 py-2 rounded-lg shadow"
          onClick={() => setShowAssigned(!showAssigned)}
        >
          {showAssigned ? "View Available Apps" : "My Tasks"}
        </button>
      </div>
      {!showAssigned && (
        <div>
          <h3 className="text-xl font-bold text-yellow-900 mb-3">
            Available Apps
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {availableTasks.map((task: Task) => (
              <div
                key={task.id}
                className="bg-yellow-100 p-3 shadow rounded-xl flex justify-center"
              >
                <img
                  src={task.app_picture}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {showAssigned && (
        <div>
          <h3 className="text-xl font-bold text-yellow-900 mb-3">
            My Assigned Apps
          </h3>
          <div className="bg-yellow-100 p-4 rounded-lg shadow mb-4">
            <p className="font-bold mb-1 text-yellow-900">My Task Progress</p>
            <p className="text-sm text-yellow-800">
              {completedCount} / {assignedTasks.length}
            </p>
            <div className="w-full bg-yellow-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-yellow-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    assignedTasks.length > 0
                      ? (completedCount / assignedTasks.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
          {/* Assigned tasks */}
          <div className="grid grid-cols-1 gap-4">
            {assignedTasks.map((task: Task) => {
              const userTask = userTaskMap[task.id];
              const isCompleted = userTask?.is_completed;
              return (
                <div
                  key={task.id}
                  className="bg-yellow-100 p-4 rounded-lg shadow flex items-center gap-4"
                >
                  <img
                    src={task.app_picture}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-yellow-900">{task.app_name}</p>
                    <p className="text-sm text-yellow-800">KES {task.reward}</p>
                    {isCompleted ? (
                      <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                        <CheckCircle size={14} /> Completed
                      </p>
                    ) : (
                      <button
                        onClick={() => handleDownload(task)}
                        className="bg-yellow-600 text-white px-4 py-1 rounded text-sm mt-1"
                      >
                        {downloading[userTask?.id]
                          ? `${downloading[userTask?.id]}%`
                          : "Start"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Audit + Completed tasks */}
          {auditAndCompleted && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">
                Audit & Completed Tasks
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {auditAndCompleted.audit_tasks.map((a: any) => (
                  <div
                    key={`audit-${a.id}`}
                    className="bg-yellow-50 p-3 rounded shadow border border-yellow-200"
                  >
                    <p className="font-semibold text-yellow-900">
                      Audit Task: {a.user_task?.task?.app_name}
                    </p>
                    <p className="text-sm text-yellow-800">
                      KES {a.user_task?.task?.reward}
                    </p>
                    <p className="text-xs text-yellow-700">
                      Temporary audit record
                    </p>
                  </div>
                ))}
                {auditAndCompleted.completed_tasks.map((c: any) => (
                  <div
                    key={`completed-${c.id}`}
                    className="bg-green-50 p-3 rounded shadow border border-green-200"
                  >
                    <p className="font-semibold text-yellow-900">
                      Completed Task: {c.user_task?.task?.app_name}
                    </p>
                    <p className="text-sm text-yellow-800">
                      KES {c.user_task?.task?.reward}
                    </p>
                    <p className="text-xs text-yellow-700">
                      Earned: KES {c.reward}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="h-16"></div>
    </div>
  );
};

export default UserTasks;
