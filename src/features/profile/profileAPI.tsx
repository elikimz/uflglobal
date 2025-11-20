import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Wallet {
  recharge_wallet: number;
  commission_wallet: number;
}

export interface Level {
  id?: number;
  name?: string;
}

export interface UserLevel {
  id: number;
  name: string;
  invested_amount: number;
  status: string;
}

export interface UserProfile {
  id: number;
  username: string;
  phone_number: string;
  invite_code?: string;
  role: string;
  is_active: boolean;
  is_suspended: boolean;
  created_at: string;
  wallet: Wallet;
  level?: Level | null;
  user_levels: UserLevel[];
}

// ======================
// API Definition
// ======================

export const userProfileAPI = createApi({
  reducerPath: "userProfileAPI",
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
  tagTypes: ["UserProfile"],
  endpoints: (builder) => ({
    // 🔹 Get current authenticated user's profile
    getUserProfile: builder.query<UserProfile, void>({
      query: () => "user-profile/",
      providesTags: ["UserProfile"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const { useGetUserProfileQuery } = userProfileAPI;
