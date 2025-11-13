import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface UserTask {
  id: number;
  name: string;
  status: string;
  created_at: string;
}

export interface UserLevel {
  level: any;
  id: number;
  user_id: number;
  level_id: number;
  invested_amount: number;
  status: string;
  created_at: string;
  name:string;
  tasks: UserTask[];
}

export interface CreateUserLevelInput {
  level_id: number;
}

export interface UpgradeUserLevelInput {
  new_level_id: number;
}

// ======================
// API Definition
// ======================

export const userLevelsAPI = createApi({
  reducerPath: "userLevelsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["UserLevels"],
  endpoints: (builder) => ({
    // 🔹 Get all user levels
    getUserLevels: builder.query<UserLevel[], void>({
      query: () => "user-levels/",
      providesTags: ["UserLevels"],
    }),

    // 🔹 Create a user level
    createUserLevel: builder.mutation<UserLevel, CreateUserLevelInput>({
      query: (body) => ({
        url: "user-levels/",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["UserLevels"],
    }),

    // 🔹 Upgrade user level
    upgradeUserLevel: builder.mutation<
      UserLevel,
      { user_level_id: number; data: UpgradeUserLevelInput }
    >({
      query: ({ user_level_id, data }) => ({
        url: `user-levels/${user_level_id}/upgrade`,
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["UserLevels"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const {
  useGetUserLevelsQuery,
  useCreateUserLevelMutation,
  useUpgradeUserLevelMutation,
} = userLevelsAPI;
