




import React, { useState, useEffect } from "react";
import { useGetTasksQuery } from "../tasks/taskAPI";
import {
  useGetUserTasksQuery,
  useCompleteUserTaskMutation,
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

  // FIXED: removed the `false` argument
  const { data: allTasks, isLoading: allLoading } = useGetTasksQuery();
  const {
    data: userTasks,
    isLoading: userLoading,
    refetch: refetchUserTasks,
  } = useGetUserTasksQuery();

  const [completeTask] = useCompleteUserTaskMutation();
  const [downloading, setDownloading] = useState<{ [key: number]: number }>({});
  const [, setSuccessMessage] = useState<{ [key: number]: boolean }>({});

  // LOGGING incoming API data
  console.log("📥 API allTasks:", allTasks);
  console.log("📥 API userTasks:", userTasks);

  // LOG when component re-renders assigned tasks
  useEffect(() => {
    console.log("🧩 Rebuilding userTaskMap with:", userTasks);
  }, [userTasks]);

  const userTaskMap =
    userTasks?.reduce((acc, ut) => {
      acc[ut.task.id] = ut;
      return acc;
    }, {} as Record<number, UserTask>) || {};

  const assignedTasks = allTasks?.filter((t: Task) => userTaskMap[t.id]) || [];
  const availableTasks =
    allTasks?.filter((t: Task) => !userTaskMap[t.id]) || [];

  console.log("🗂️ assignedTasks:", assignedTasks);
  console.log("🟦 availableTasks:", availableTasks);

  const completedCount = Object.values(userTaskMap).filter(
    (ut) => ut.is_completed
  ).length;

  console.log("✅ completedCount:", completedCount);

  const handleDownload = (task: Task) => {
    const user_task_id = userTaskMap[task.id]?.id;

    console.log("⬇️ Download clicked for:", task);
    console.log("🎯 user_task_id:", user_task_id);

    if (!user_task_id) {
      console.log("❌ No user_task_id found for task", task.id);
      return;
    }

    if (downloading[user_task_id]) {
      console.log("⏳ Already downloading:", user_task_id);
      return;
    }

    setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) progress = 100;

      setDownloading((prev) => ({ ...prev, [user_task_id]: progress }));
      console.log(`📊 Download progress for ${user_task_id}:`, progress);

      if (progress >= 100) {
        clearInterval(interval);

        console.log("🚀 Completing task:", user_task_id);

        completeTask(user_task_id)
          .unwrap()
          .then(() => {
            console.log("🎉 Task completed successfully:", user_task_id);

            setSuccessMessage((prev) => ({ ...prev, [user_task_id]: true }));
            refetchUserTasks();
            setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));

            setTimeout(() => {
              setSuccessMessage((prev) => ({
                ...prev,
                [user_task_id]: false,
              }));
            }, 8000);
          })
          .catch((err) => {
            console.log("❌ Task completion failed:", err);
            setDownloading((prev) => ({ ...prev, [user_task_id]: 0 }));
          });
      }
    }, 300);
  };

  if (allLoading || userLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#3B82F6]">Loading...</p>
      </div>
    );

  return (
    <div className="p-4 bg-gradient-to-b from-[#87CEEB] to-[#1E90FF] min-h-screen">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Task Center
      </h2>

      <div className="flex justify-center mb-5">
        <button
          className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow"
          onClick={() => {
            console.log("🔁 Switching view:", !showAssigned);
            setShowAssigned(!showAssigned);
          }}
        >
          {showAssigned ? "View Available Apps" : "My Tasks"}
        </button>
      </div>

      {!showAssigned && (
        <div>
          <h3 className="text-xl font-bold text-white mb-3">Available Apps</h3>

          <div className="grid grid-cols-3 gap-4">
            {availableTasks.map((task: Task) => (
              <div
                key={task.id}
                className="bg-white p-3 shadow rounded-xl flex justify-center"
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
          <h3 className="text-xl font-bold text-white mb-3">
            My Assigned Apps
          </h3>

          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <p className="font-bold mb-1">My Task Progress</p>
            <p className="text-sm text-gray-600">
              {completedCount} / {assignedTasks.length}
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
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

          <div className="grid grid-cols-1 gap-4">
            {assignedTasks.map((task: Task) => {
              const userTask = userTaskMap[task.id];
              const isCompleted = userTask?.is_completed;

              console.log("📌 Rendering task:", task);
              console.log("🔍 userTask:", userTask);

              return (
                <div
                  key={task.id}
                  className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
                >
                  <img
                    src={task.app_picture}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-bold">{task.app_name}</p>
                    <p className="text-sm text-gray-600">KES {task.reward}</p>

                    {isCompleted ? (
                      <p className="text-green-500 text-sm flex items-center gap-1 mt-1">
                        <CheckCircle size={14} /> Completed
                      </p>
                    ) : (
                      <button
                        onClick={() => handleDownload(task)}
                        className="bg-blue-500 text-white px-4 py-1 rounded text-sm mt-1"
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
        </div>
      )}

      <div className="h-16"></div>
    </div>
  );
};

export default UserTasks;
