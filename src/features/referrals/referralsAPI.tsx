import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface ReferredUser {
  referred: any;
  id: number;
  username: string;
  phone_number?: string;
  invite_code?: string;
  children?: ReferredUser[];
  level?: string;
  is_active?: boolean;
  bonus_amount?: number;
}

// ======================
// API Definition
// ======================

export const referralsAPI = createApi({
  reducerPath: "referralsAPI",
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
  tagTypes: ["Referrals"],
  endpoints: (builder) => ({
    // 🔹 Get authenticated user's team
    getUserTeam: builder.query<ReferredUser[], void>({
      query: () => "referrals/team",
      providesTags: ["Referrals"],
    }),

    // 🔹 Get all referrals (admin only)
    getAllReferrals: builder.query<ReferredUser[], void>({
      query: () => "referrals/all",
      providesTags: ["Referrals"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const { useGetUserTeamQuery, useGetAllReferralsQuery } = referralsAPI;
