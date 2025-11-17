import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Task {
  id: number;
  level_id: number;
  app_name: string;
  app_picture: string;
  reward: number;
  is_completed: boolean;
  created_at: string;
  completed_at?: string | null;
}

export interface CreateTaskInput {
  level_id: number;
  app_name: string;
  app_picture: string;
  reward: number;
}

export interface UpdateTaskInput {
  level_id?: number;
  app_name?: string;
  app_picture?: string;
  reward?: number;
  is_completed?: boolean;
}

// ======================
// API Definition
// ======================

export const tasksAPI = createApi({
  reducerPath: "tasksAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // ✅ Add token from localStorage
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    // 🔹 Get all tasks
    getTasks: builder.query<Task[], void>({
      query: () => "tasks/",
      providesTags: ["Tasks"],
    }),

    // 🔹 Create task
    createTask: builder.mutation<Task, CreateTaskInput>({
      query: (body) => ({
        url: "tasks/",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Tasks"],
    }),

    // 🔹 Update task
    updateTask: builder.mutation<
      Task,
      { task_id: number; data: UpdateTaskInput }
    >({
      query: ({ task_id, data }) => ({
        url: `tasks/${task_id}`,
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Tasks"],
    }),

    // 🔹 Delete task
    deleteTask: builder.mutation<void, number>({
      query: (task_id) => ({
        url: `tasks/${task_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksAPI;
