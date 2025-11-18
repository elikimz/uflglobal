import React, { useState } from "react";
import { useGetTasksQuery } from "../tasks/taskAPI";
import {
  useGetUserTasksQuery,
  useCompleteUserTaskMutation,
} from "../userTask/userTaskAPI";
import { CheckCircle, Download } from "lucide-react";

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
  const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();
  const {
    data: userTasks,
    isLoading: userLoading,
    refetch: refetchUserTasks,
  } = useGetUserTasksQuery(false);
  const [completeTask] = useCompleteUserTaskMutation();
  const [downloading, setDownloading] = useState<{ [key: number]: number }>({});
  const [successMessage, setSuccessMessage] = useState<{
    [key: number]: boolean;
  }>({});

  const userTaskMap =
    userTasks?.reduce((acc, ut) => {
      acc[ut.task.id] = ut;
      return acc;
    }, {} as Record<number, UserTask>) || {};

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
            setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
            setTimeout(() => {
              setSuccessMessage((prev) => ({ ...prev, [user_task_id]: false }));
            }, 10000);
          })
          .catch(() => {
            setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
          });
      }
    }, 300);
  };

  if (allLoading || userLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#3B82F6]">Loading tasks...</p>
      </div>
    );

  const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];
  const unassignedTasks = allTasks?.filter((t: Task) => !userTaskMap[t.id]) || [];

  return (
    <div className="p-6 bg-[#0A0F2C] min-h-screen">
      {/* Assigned Tasks Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#C7D2FE] mb-4">
          My Assigned Apps
        </h2>

        {assignedTasks?.length === 0 ? (
          <p className="text-[#C7D2FE]/70">No tasks assigned yet.</p>
        ) : (
          <div className="space-y-6">
            {assignedTasks.map((task: Task) => {
              const userTask = userTaskMap[task.id];
              const isCompleted = userTask?.is_completed;

              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={task.app_picture}
                      className="h-14 w-14 object-cover rounded-lg border border-[#5B4BFF]/30"
                    />
                    <div>
                      <h3 className="font-semibold text-[#C7D2FE]">
                        {task.app_name}
                      </h3>
                      <p className="text-sm text-[#C7D2FE]/70">
                        +{task.reward}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-[#10B981] text-sm">
                        <CheckCircle size={16} /> Done
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDownload(task)}
                        className="flex items-center gap-1 bg-[#3B82F6] text-white text-sm px-3 py-1.5 rounded-lg hover:bg-[#2563EB]"
                      >
                        {downloading[userTask.id] ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {downloading[userTask.id]}%
                          </>
                        ) : (
                          <Download size={16} />
                        )}
                        {!downloading[userTask.id] && " Download"}
                      </button>
                    )}

                    {successMessage[userTask.id] && (
                      <p className="text-xs text-[#10B981] mt-1">
                        App downloaded successfully and reward taken to your
                        wallet!
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Unassigned Tasks Section */}
      <div>
        <h2 className="text-2xl font-bold text-[#C7D2FE] mb-4">
          Available Apps
        </h2>

        <div className="space-y-6">
          {unassignedTasks?.map((task: Task) => (
            <div
              key={task.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={task.app_picture}
                  className="h-14 w-14 object-cover rounded-lg border border-[#5B4BFF]/30"
                />
                <div>
                  <h3 className="font-semibold text-[#C7D2FE]">
                    {task.app_name}
                  </h3>
                  <p className="text-sm text-[#C7D2FE]/70">+{task.reward}</p>
                </div>
              </div>

              <p className="text-sm text-[#C7D2FE]/50">Not Assigned</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTasks;
