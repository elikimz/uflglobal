

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // ======================
// // Interfaces
// // ======================

// export interface Withdrawal {
//   user: any;
//   level_name: any;
//   id: number;
//   user_id: number;
//   amount: number;
//   transaction_fee: number;
//   net_amount: number;
//   wallet_type: string;
//   method: string;
//   account_name: string;
//   account_number: string;
//   status: string;
//   created_at: string;
//   approved_at?: string;
// }

// export interface CreateWithdrawalInput {
//   amount: number;
//   wallet_type?: 'commission'; // force commission
//   method: 'mpesa' | 'bank';
//   withdrawal_pin: string;
// }

// export interface UpdateWithdrawalStatusInput {
//   status: 'success' | 'canceled' | 'reversed';
// }

// // Payment details
// export interface PaymentDetailsUpdateInput {
//   mpesa_number?: string;
//   bank_name?: string;
//   bank_account_number?: string;
//   full_name?: string;
// }

// // New interface for payment details response
// export interface PaymentDetailsResponse {
//   has_payment_details: boolean;
//   mpesa_number?: string;
//   bank_name?: string;
//   bank_account_number?: string;
//   full_name?: string;
//   message: string;
// }

// // PIN
// export interface SetPinInput {
//   pin: string;
// }

// export interface UpdatePinInput {
//   old_pin: string;
//   new_pin: string;
// }

// // Block/unblock withdrawals
// export interface ToggleWithdrawalsInput {
//   user_id: number;
//   block: boolean; // true = block, false = unblock
// }

// export interface ToggleWithdrawalsResponse {
//   message: string;
//   user_id: number;
//   can_withdraw: boolean;
// }

// // Wallet interfaces
// export interface Wallet {
//   id: number;
//   user_id: number;
//   recharge_wallet: number;
//   commission_wallet: number;
//   created_at: string;
//   updated_at: string;
//   username: string;
//   level_name: string | null;
// }

// export interface WalletUpdateInput {
//   recharge_wallet?: number;
//   commission_wallet?: number;
// }

// // ======================
// // API Definition
// // ======================

// export const withdrawalAPI = createApi({
//   reducerPath: 'withdrawalAPI',
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_BASE_URL,
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem('access_token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ['Withdrawals', 'AllUsers', 'Wallets'],
//   endpoints: (builder) => ({
//     // 🔹 Pin status
//     getPinStatus: builder.query<{ has_pin: boolean }, void>({
//       query: () => 'withdrawals/pin/status',
//       providesTags: ['Withdrawals'],
//     }),

//     // 🔹 Set PIN
//     setPin: builder.mutation<void, SetPinInput>({
//       query: (body) => ({
//         url: 'withdrawals/pin/set',
//         method: 'POST',
//         body,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Withdrawals'],
//     }),

//     // 🔹 Update PIN
//     updatePin: builder.mutation<void, UpdatePinInput>({
//       query: (body) => ({
//         url: 'withdrawals/pin/update',
//         method: 'PUT',
//         body,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Withdrawals'],
//     }),

//     // 🔹 Get payment details
//     getPaymentDetails: builder.query<PaymentDetailsResponse, void>({
//       query: () => 'withdrawals/payment-details',
//       providesTags: ['Withdrawals'],
//     }),

//     // 🔹 Update payment details
//     updatePaymentDetails: builder.mutation<void, PaymentDetailsUpdateInput>({
//       query: (body) => ({
//         url: 'withdrawals/payment-details',
//         method: 'PUT',
//         body,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Withdrawals'],
//     }),

//     // 🔹 Create withdrawal
//     createWithdrawal: builder.mutation<Withdrawal, CreateWithdrawalInput>({
//       query: (body) => ({
//         url: 'withdrawals/',
//         method: 'POST',
//         body,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Withdrawals'],
//     }),

//     // 🔹 List my withdrawals
//     getMyWithdrawals: builder.query<Withdrawal[], void>({
//       query: () => 'withdrawals/me',
//       providesTags: ['Withdrawals'],
//     }),

//     // 🔹 Admin: get all withdrawals
//     getAllWithdrawals: builder.query<Withdrawal[], void>({
//       query: () => 'withdrawals/all',
//       providesTags: ['Withdrawals'],
//     }),

//     // 🔹 Update withdrawal status (Admin only)
//     updateWithdrawalStatus: builder.mutation<
//       Withdrawal,
//       { withdrawal_id: number } & UpdateWithdrawalStatusInput
//     >({
//       query: ({ withdrawal_id, status }) => ({
//         url: `withdrawals/${withdrawal_id}/status`,
//         method: 'PUT',
//         body: { status },
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Withdrawals'],
//     }),

//     // 🔹 Admin: Block/Unblock user withdrawals
//     toggleUserWithdrawals: builder.mutation<
//       ToggleWithdrawalsResponse,
//       ToggleWithdrawalsInput
//     >({
//       query: ({ user_id, block }) => ({
//         url: `withdrawals/block-user`,
//         method: 'PUT',
//         body: { user_id, block },
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Withdrawals', 'AllUsers'],
//     }),

//     // 🔹 Admin: Get all wallets
//     getAllWallets: builder.query<Wallet[], void>({
//       query: () => 'wallets/all',
//       providesTags: ['Wallets'],
//     }),

//     // 🔹 Admin: Update wallet balance
//     updateWalletBalance: builder.mutation<
//       Wallet,
//       { wallet_id: number } & WalletUpdateInput
//     >({
//       query: ({ wallet_id, ...body }) => ({
//         url: `wallets/${wallet_id}`,
//         method: 'PATCH',
//         body,
//         headers: { 'Content-Type': 'application/json' },
//       }),
//       invalidatesTags: ['Wallets'],
//     }),
//   }),
// });

// // ======================
// // Hooks Export
// // ======================
// export const {
//   useGetPinStatusQuery,
//   useSetPinMutation,
//   useUpdatePinMutation,
//   useGetPaymentDetailsQuery,
//   useUpdatePaymentDetailsMutation,
//   useCreateWithdrawalMutation,
//   useGetMyWithdrawalsQuery,
//   useGetAllWithdrawalsQuery,
//   useUpdateWithdrawalStatusMutation,
//   useToggleUserWithdrawalsMutation,
//   useGetAllWalletsQuery,       // ✅ new hook
//   useUpdateWalletBalanceMutation,  // ✅ new hook
// } = withdrawalAPI;






import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ======================
// Interfaces
// ======================

export interface Withdrawal {
  user: any;
  level_name: any;
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

export interface UserDetails {
  user_id: number;
  phone_number: string;
  username: string;
  level_name: string | null;
  wallet_balance: number;
  mpesa_number: string | null;
  bank_name: string | null;
  bank_account_number: string | null;
  full_name: string | null;
}

export interface WithdrawalWithUserDetails {
  withdrawals: any;
  total_withdrawn: number;
  withdrawal_id: number;
  amount: number;
  net_amount: number;
  method: string;
  status: string;
  created_at: string;
  approved_at?: string;
  user: UserDetails;
}

export interface WithdrawalTotalResponse {
  total_success_withdrawn: number;
}

export interface CreateWithdrawalInput {
  amount: number;
  wallet_type?: 'commission';
  method: 'mpesa' | 'bank';
  withdrawal_pin: string;
}

export interface UpdateWithdrawalStatusInput {
  status: 'success' | 'canceled' | 'reversed';
}

export interface PaymentDetailsUpdateInput {
  mpesa_number?: string;
  bank_name?: string;
  bank_account_number?: string;
  full_name?: string;
}

export interface PaymentDetailsResponse {
  has_payment_details: boolean;
  mpesa_number?: string;
  bank_name?: string;
  bank_account_number?: string;
  full_name?: string;
  message: string;
}

export interface SetPinInput {
  pin: string;
}

export interface UpdatePinInput {
  old_pin: string;
  new_pin: string;
}

export interface ToggleWithdrawalsInput {
  user_id: number;
  block: boolean;
}

export interface ToggleWithdrawalsResponse {
  message: string;
  user_id: number;
  can_withdraw: boolean;
}

export interface Wallet {
  id: number;
  user_id: number;
  recharge_wallet: number;
  commission_wallet: number;
  created_at: string;
  updated_at: string;
  username: string;
  level_name: string | null;
}

export interface WalletUpdateInput {
  recharge_wallet?: number;
  commission_wallet?: number;
}

// ======================
// API Definition
// ======================

export const withdrawalAPI = createApi({
  reducerPath: 'withdrawalAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Withdrawals', 'AllUsers', 'Wallets'],
  endpoints: (builder) => ({

    getPinStatus: builder.query<{ has_pin: boolean }, void>({
      query: () => 'withdrawals/pin/status',
      providesTags: ['Withdrawals'],
    }),

    setPin: builder.mutation<void, SetPinInput>({
      query: (body) => ({
        url: 'withdrawals/pin/set',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    updatePin: builder.mutation<void, UpdatePinInput>({
      query: (body) => ({
        url: 'withdrawals/pin/update',
        method: 'PUT',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    getPaymentDetails: builder.query<PaymentDetailsResponse, void>({
      query: () => 'withdrawals/payment-details',
      providesTags: ['Withdrawals'],
    }),

    updatePaymentDetails: builder.mutation<void, PaymentDetailsUpdateInput>({
      query: (body) => ({
        url: 'withdrawals/payment-details',
        method: 'PUT',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    createWithdrawal: builder.mutation<Withdrawal, CreateWithdrawalInput>({
      query: (body) => ({
        url: 'withdrawals/',
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    getMyWithdrawals: builder.query<Withdrawal[], void>({
      query: () => 'withdrawals/me',
      providesTags: ['Withdrawals'],
    }),

    getAllWithdrawals: builder.query<Withdrawal[], void>({
      query: () => 'withdrawals/all',
      providesTags: ['Withdrawals'],
    }),

    // ⭐ USER TOTAL SUCCESS WITHDRAWALS
    getMySuccessWithdrawalTotal: builder.query<WithdrawalTotalResponse, void>({
      query: () => 'withdrawals/me/success/total',
      providesTags: ['Withdrawals'],
    }),

    // ⭐ ADMIN: FETCH ALL SUCCESSFUL WITHDRAWALS WITH USER DETAILS
    getAllSuccessWithdrawals: builder.query<WithdrawalWithUserDetails[], void>({
      query: () => 'withdrawals/success',
      providesTags: ['Withdrawals'],
    }),

    updateWithdrawalStatus: builder.mutation<
      Withdrawal,
      { withdrawal_id: number } & UpdateWithdrawalStatusInput
    >({
      query: ({ withdrawal_id, status }) => ({
        url: `withdrawals/${withdrawal_id}/status`,
        method: 'PUT',
        body: { status },
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Withdrawals'],
    }),

    toggleUserWithdrawals: builder.mutation<
      ToggleWithdrawalsResponse,
      ToggleWithdrawalsInput
    >({
      query: ({ user_id, block }) => ({
        url: `withdrawals/block-user`,
        method: 'PUT',
        body: { user_id, block },
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Withdrawals', 'AllUsers'],
    }),

    getAllWallets: builder.query<Wallet[], void>({
      query: () => 'wallets/all',
      providesTags: ['Wallets'],
    }),

    updateWalletBalance: builder.mutation<
      Wallet,
      { wallet_id: number } & WalletUpdateInput
    >({
      query: ({ wallet_id, ...body }) => ({
        url: `wallets/${wallet_id}`,
        method: 'PATCH',
        body,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Wallets'],
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
  useGetPaymentDetailsQuery,
  useUpdatePaymentDetailsMutation,
  useCreateWithdrawalMutation,
  useGetMyWithdrawalsQuery,
  useGetAllWithdrawalsQuery,
  useGetMySuccessWithdrawalTotalQuery,
  useGetAllSuccessWithdrawalsQuery, // ⭐ New hook
  useUpdateWithdrawalStatusMutation,
  useToggleUserWithdrawalsMutation,
  useGetAllWalletsQuery,
  useUpdateWalletBalanceMutation,
} = withdrawalAPI;
