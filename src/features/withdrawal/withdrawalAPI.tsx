import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Withdrawal {
  id: number;
  user_id: number;
  amount: number;
  transaction_fee: number;
  net_amount: number;
  wallet_type: string;
  method: string;
  account_name: string;
  account_number: string;
  status: string;
  created_at: string;
  approved_at?: string;
}

export interface CreateWithdrawalInput {
  amount: number;
  wallet_type?: "commission"; // force commission
  method: "mpesa" | "bank";
  withdrawal_pin: string;
}

export interface UpdateWithdrawalStatusInput {
  status: "success" | "canceled" | "reversed";
}

// Payment details
export interface PaymentDetailsUpdateInput {
  mpesa_number?: string;
  bank_name?: string;
  bank_account_number?: string;
  full_name?: string;
}

// PIN
export interface SetPinInput {
  pin: string;
}

export interface UpdatePinInput {
  old_pin: string;
  new_pin: string;
}

// ======================
// API Definition
// ======================

export const withdrawalAPI = createApi({
  reducerPath: "withdrawalAPI",
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
  tagTypes: ["Withdrawals"],
  endpoints: (builder) => ({
    // 🔹 Pin status
    getPinStatus: builder.query<{ has_pin: boolean }, void>({
      query: () => "withdrawals/pin/status",
      providesTags: ["Withdrawals"],
    }),

    // 🔹 Set PIN
    setPin: builder.mutation<void, SetPinInput>({
      query: (body) => ({
        url: "withdrawals/pin/set",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    // 🔹 Update PIN
    updatePin: builder.mutation<void, UpdatePinInput>({
      query: (body) => ({
        url: "withdrawals/pin/update",
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    // 🔹 Update payment details
    updatePaymentDetails: builder.mutation<void, PaymentDetailsUpdateInput>({
      query: (body) => ({
        url: "withdrawals/payment-details",
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    // 🔹 Create withdrawal
    createWithdrawal: builder.mutation<Withdrawal, CreateWithdrawalInput>({
      query: (body) => ({
        url: "withdrawals/",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Withdrawals"],
    }),

    // 🔹 List my withdrawals
    getMyWithdrawals: builder.query<Withdrawal[], void>({
      query: () => "withdrawals/me",
      providesTags: ["Withdrawals"],
    }),

    // 🔹 Admin: get all withdrawals
    getAllWithdrawals: builder.query<Withdrawal[], void>({
      query: () => "withdrawals/all",
      providesTags: ["Withdrawals"],
    }),

    // 🔹 Update withdrawal status (Admin only)
    updateWithdrawalStatus: builder.mutation<
      Withdrawal,
      { withdrawal_id: number } & UpdateWithdrawalStatusInput
    >({
      query: ({ withdrawal_id, status }) => ({
        url: `withdrawals/${withdrawal_id}/status`,
        method: "PUT",
        body: { status },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Withdrawals"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================
export const {
  useGetPinStatusQuery,
  useSetPinMutation,
  useUpdatePinMutation,
  useUpdatePaymentDetailsMutation,
  useCreateWithdrawalMutation,
  useGetMyWithdrawalsQuery,
  useGetAllWithdrawalsQuery,
  useUpdateWithdrawalStatusMutation,
} = withdrawalAPI;
