


// import React, { useState } from "react";
// import { useGetTasksQuery } from "../tasks/taskAPI";
// import {
//   useGetUserTasksQuery,
//   useCompleteUserTaskMutation,
// } from "../userTask/userTaskAPI";
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
//   const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();
//   const {
//     data: userTasks,
//     isLoading: userLoading,
//     refetch: refetchUserTasks,
//   } = useGetUserTasksQuery(false);
//   const [completeTask] = useCompleteUserTaskMutation();
//   const [downloading, setDownloading] = useState<{ [key: number]: number }>({});
//   const [, setSuccessMessage] = useState<{ [key: number]: boolean }>({});

//   const userTaskMap =
//     userTasks?.reduce((acc, ut) => {
//       acc[ut.task.id] = ut;
//       return acc;
//     }, {} as Record<number, UserTask>) || {};

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
//             setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
//             setTimeout(() => {
//               setSuccessMessage((prev) => ({ ...prev, [user_task_id]: false }));
//             }, 10000);
//           })
//           .catch(() => {
//             setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
//           });
//       }
//     }, 300);
//   };

//   if (allLoading || userLoading)
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-[#3B82F6]">Loading tasks...</p>
//       </div>
//     );

//   const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];

//   return (
//     <div className="p-4 bg-gradient-to-b from-[#87CEEB] to-[#1E90FF] min-h-screen">
//       {/* Earnings and Balance Section */}
//       <div className="flex justify-between mb-4">
//         <div className="bg-white p-4 rounded-lg shadow-md w-1/2 mr-2">
//           <p className="text-gray-600">Today's earnings</p>
//           <p className="text-2xl font-bold text-blue-600">KES 270</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md w-1/2 ml-2">
//           <p className="text-gray-600">Total balance</p>
//           <p className="text-2xl font-bold text-blue-600">KES 540.00</p>
//         </div>
//       </div>

//       {/* App Icons Grid */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold text-white mb-4">My Assigned Apps</h2>
//         <div className="grid grid-cols-4 gap-4">
//           {assignedTasks.map((task: Task) => {
//             const userTask = userTaskMap[task.id];
//             const isCompleted = userTask?.is_completed;

//             return (
//               <div
//                 key={task.id}
//                 className="flex flex-col items-center bg-white p-2 rounded-lg shadow"
//               >
//                 <div className="w-12 h-12 mb-2">
//                   <img
//                     src={task.app_picture}
//                     alt={task.app_name}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//                 <p className="text-xs text-gray-700 truncate w-full text-center">
//                   {task.app_name}
//                 </p>
//                 {isCompleted ? (
//                   <div className="text-xs text-green-500 flex items-center">
//                     <CheckCircle size={12} /> Done
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => handleDownload(task)}
//                     className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-1"
//                   >
//                     {downloading[userTask.id] ? (
//                       <>{downloading[userTask.id]}%</>
//                     ) : (
//                       "Start"
//                     )}
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Task Progress Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <div className="flex justify-between items-center mb-2">
//           <p className="font-bold">Starting</p>
//           <p className="text-sm text-gray-600">18/18</p>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2.5">
//           <div className="bg-blue-600 h-2.5 rounded-full w-full"></div>
//         </div>
//         <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4">
//           Start Task
//         </button>
//       </div>

//       {/* Notice Section */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h3 className="font-bold mb-2">Important Notice</h3>
//         <ul className="list-disc pl-5 text-sm text-gray-600">
//           <li>Working hours: 00:01-23:59</li>
//           <li>If you need assistance, please contact your hiring manager!</li>
//         </ul>
//       </div>

//       {/* Bottom Navigation */}
//       <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around border-t border-gray-200">
//         <button className="flex flex-col items-center">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6-10h6"
//             />
//           </svg>
//           <span className="text-xs">Home</span>
//         </button>
//         <button className="flex flex-col items-center">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//             />
//           </svg>
//           <span className="text-xs">Task Area</span>
//         </button>
//         <button className="flex flex-col items-center">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2-.07-2.5 0"
//             />
//           </svg>
//           <span className="text-xs">Profit</span>
//         </button>
//         <button className="flex flex-col items-center">
//           <svg
//             className="w-6 h-6 text-gray-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//             />
//           </svg>
//           <span className="text-xs">My</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserTasks;
