// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// // ======================
// // Interfaces
// // ======================

// export interface EarningsResponse {
//   user_id: number;
//   todays_earnings: number;
//   this_weeks_earnings: number;
//   this_months_earnings: number;
//   task_rebate_earnings: number;
//   referral_commission: number;
// }

// export interface TransactionHistoryItem {
//   type: "deposit" | "withdrawal";
//   amount: number;
//   description?: string;
//   method?: string;
//   status: string;
//   created_at: string;
//   transaction_fee?: number;
//   net_amount?: number;
// }

// export interface TransactionHistoryResponse {
//   user_id: number;
//   history: TransactionHistoryItem[];
// }

// // ======================
// // API Definition
// // ======================

// export const earningsAPI = createApi({
//   reducerPath: "earningsAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_BASE_URL,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("access_token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Earnings"],

//   endpoints: (builder) => ({
//     // 🔹 Get my earnings summary
//     getMyEarnings: builder.query<EarningsResponse, void>({
//       query: () => "earnings/me",
//       providesTags: ["Earnings"],
//     }),

//     // 🔹 Get my deposit + withdrawal history
//     getMyTransactionHistory: builder.query<TransactionHistoryResponse, void>({
//       query: () => "earnings/history",
//       providesTags: ["Earnings"],
//     }),
//   }),
// });

// // ======================
// // Hooks Export
// // ======================

// export const { useGetMyEarningsQuery, useGetMyTransactionHistoryQuery } =
//   earningsAPI;





import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface EarningsResponse {
  user_id: number;
  todays_earnings: number;
  this_weeks_earnings: number;
  this_months_earnings: number;
  task_rebate_earnings: number;
  referral_commission: number;
}

export interface TransactionHistoryItem {
  type: "deposit" | "withdrawal";
  amount: number;
  description?: string;
  method?: string;
  status: string;
  created_at: string;
  transaction_fee?: number;
  net_amount?: number;
}

export interface TransactionHistoryResponse {
  user_id: number;
  history: TransactionHistoryItem[];
}

export interface AdminNetFundsResponse {
  total_approved_deposits: number;
  total_approved_withdrawals: number;
  net_total: number;
}

// ======================
// API Definition
// ======================

export const earningsAPI = createApi({
  reducerPath: "earningsAPI",
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
  tagTypes: ["Earnings"],

  endpoints: (builder) => ({
    // 🔹 Get my earnings summary
    getMyEarnings: builder.query<EarningsResponse, void>({
      query: () => "earnings/me",
      providesTags: ["Earnings"],
    }),

    // 🔹 Get my deposit + withdrawal history
    getMyTransactionHistory: builder.query<TransactionHistoryResponse, void>({
      query: () => "earnings/history",
      providesTags: ["Earnings"],
    }),

    // 🔹 Get admin net funds (approved deposits - approved withdrawals)
    getAdminNetFunds: builder.query<AdminNetFundsResponse, void>({
      query: () => "earnings/net-funds",
      providesTags: ["Earnings"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const {
  useGetMyEarningsQuery,
  useGetMyTransactionHistoryQuery,
  useGetAdminNetFundsQuery, // ✅ new admin hook
} = earningsAPI;
