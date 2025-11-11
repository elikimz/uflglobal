import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Deposit {
  id: number;
  user_id: number;
  amount: number;
  status: string;
  payer_name: string;
  payer_number: string;
  payment_message: string;
  created_at: string;
}

export interface CreateDepositInput {
  amount: number;
  payer_name: string;
  payer_number: string;
  payment_message: string;
}

export interface UpdateDepositStatusInput {
  deposit_id: number;
  status: string;
}

// ======================
// API Definition
// ======================

export const depositAPI = createApi({
  reducerPath: "depositAPI",
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
  tagTypes: ["Deposits"],
  endpoints: (builder) => ({
    // 🔹 List user deposits
    getDeposits: builder.query<Deposit[], void>({
      query: () => "deposits/me",
      providesTags: ["Deposits"],
    }),

    // 🔹 Admin: Get all deposits
    getAllDeposits: builder.query<Deposit[], void>({
      query: () => "deposits/all",
      providesTags: ["Deposits"],
    }),

    // 🔹 Create a new deposit
    createDeposit: builder.mutation<Deposit, CreateDepositInput>({
      query: (body) => ({
        url: "deposits/",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Deposits"],
    }),

    // 🔹 Update deposit status (Admin only)
    updateDepositStatus: builder.mutation<Deposit, UpdateDepositStatusInput>({
      query: ({ deposit_id, status }) => ({
        url: `deposits/${deposit_id}/status`,
        method: "PUT",
        body: { status },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Deposits"],
    }),

    // 🔹 Delete a deposit (Admin only)
    deleteDeposit: builder.mutation<void, number>({
      query: (deposit_id) => ({
        url: `deposits/${deposit_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deposits"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================
export const {
  useGetDepositsQuery, // user deposits
  useGetAllDepositsQuery, // admin fetch all deposits
  useCreateDepositMutation,
  useUpdateDepositStatusMutation,
  useDeleteDepositMutation,
} = depositAPI;
