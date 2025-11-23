import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Level {
  id: number;
  name: string;
  work_deposit: number;
  number_of_tasks: number;
  mission_income: number;
  mission_day_income: number;
  task_monthly_income: number;
  mission_annual_income: number;
  description?: string | null; // ✅ make optional & nullable
  created_at: string;
}

export interface CreateLevelInput {
  name: string;
  work_deposit: number;
  number_of_tasks: number;
  mission_income: number;
  mission_day_income: number;
  task_monthly_income: number;
  mission_annual_income: number;
  description?: string | null; // ✅ optional
}

export interface UpdateLevelInput {
  name?: string;
  work_deposit?: number;
  number_of_tasks?: number;
  mission_income?: number;
  mission_day_income?: number;
  task_monthly_income?: number;
  mission_annual_income?: number;
  description?: string | null; // ✅ optional
}

// ======================
// API Definition
// ======================

export const levelsAPI = createApi({
  reducerPath: "levelsAPI/",
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
  tagTypes: ["Levels"],
  endpoints: (builder) => ({
    // 🔹 Get all levels
    getLevels: builder.query<Level[], void>({
      query: () => "levels/",
      providesTags: ["Levels"],
    }),

    // 🔹 Create a new level
    createLevel: builder.mutation<Level, CreateLevelInput>({
      query: (body) => ({
        url: "levels",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Levels"],
    }),

    // 🔹 Update a level
    updateLevel: builder.mutation<
      Level,
      { level_id: number; data: UpdateLevelInput }
    >({
      query: ({ level_id, data }) => ({
        url: `levels/${level_id}`,
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Levels"],
    }),

    // 🔹 Delete a level
    deleteLevel: builder.mutation<void, number>({
      query: (level_id) => ({
        url: `levels/${level_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Levels"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const {
  useGetLevelsQuery,
  useCreateLevelMutation,
  useUpdateLevelMutation,
  useDeleteLevelMutation,
} = levelsAPI;
