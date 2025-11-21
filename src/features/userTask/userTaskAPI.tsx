


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userTasksAPI = createApi({
  reducerPath: "userTasksAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["UserTask"],
  endpoints: (builder) => ({
    // GET /user-tasks/?is_completed=...
    getUserTasks: builder.query<any[], boolean | void>({
      query: (is_completed = false) =>
        `/user-tasks/?is_completed=${is_completed}`,
      providesTags: ["UserTask"],
    }),

    // POST /user-tasks/{user_task_id}/complete
    completeUserTask: builder.mutation<any, number>({
      query: (user_task_id) => ({
        url: `/user-tasks/${user_task_id}/complete`,
        method: "POST",
      }),
      invalidatesTags: ["UserTask"],
    }),

    // NEW: GET /user-tasks/audit-and-completed
    getAuditAndCompletedTasks: builder.query<
      { audit_tasks: any[]; completed_tasks: any[] },
      void
    >({
      query: () => `/user-tasks/audit-and-completed`,
      providesTags: ["UserTask"],
    }),
  }),
});

export const {
  useGetUserTasksQuery,
  useCompleteUserTaskMutation,
  useGetAuditAndCompletedTasksQuery, // <-- new hook
} = userTasksAPI;
