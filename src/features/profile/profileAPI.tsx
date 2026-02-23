


// profileAPI.ts
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
  can_withdraw: boolean;
  is_suspended: boolean;
  transaction_pin?: string | null;
  password_hash: string;
  referred_by?: number | null;
  level_id?: number | null;
  created_at: string;
  wallet: Wallet;
  level?: Level | null;
  user_levels: UserLevel[];
}

// ======================
// New Interface for Active Users
// ======================
export interface ActiveUser {
  id: number;
  phone_number: string;
  username: string;
  is_active: boolean;
  can_withdraw: boolean;
  is_suspended: boolean;
  role: string;
  created_at: string;
  level?: Level | null;
}

// ======================
// API Definition
// ======================
export const userProfileAPI = createApi({
  reducerPath: "userProfileAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("access_token");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  tagTypes: ["UserProfile", "AllUsers", "ActiveUsers"], // Added ActiveUsers tag
  endpoints: (builder) => ({
    // 🔹 Get current authenticated user's profile
    getUserProfile: builder.query<UserProfile, void>({
      query: () => "user-profile/",
      providesTags: ["UserProfile"],
    }),

    // 🔹 Get all users (admin)
    getAllUsers: builder.query<UserProfile[], void>({
      query: () => "user-profile/all-users",
      providesTags: ["AllUsers"],
    }),

    // 🔥 NEW: Get all active users (admin)
    getAllActiveUsers: builder.query<ActiveUser[], void>({
      query: () => "user-profile/active",
      providesTags: ["ActiveUsers"],
    }),

    // 🔹 Toggle user withdrawal access (admin)
    toggleUserWithdraw: builder.mutation<
      { message: string },
      { user_id: number; can_withdraw: boolean }
    >({
      query: ({ user_id, can_withdraw }) => ({
        url: "user-profile/toggle-withdraw",
        method: "PUT",
        body: { user_id, can_withdraw },
      }),
      invalidatesTags: ["AllUsers", "ActiveUsers"], // refresh both tags after toggle
    }),
  }),
});

// ======================
// Hooks Export
// ======================
export const {
  useGetUserProfileQuery,
  useGetAllUsersQuery,
  useGetAllActiveUsersQuery, // New hook
  useToggleUserWithdrawMutation,
} = userProfileAPI;
