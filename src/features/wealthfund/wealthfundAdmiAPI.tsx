// src/services/wealthFundsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wealthFundsAPI = createApi({
  reducerPath: "wealthFundsAPI",
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
  tagTypes: ["WealthFund"],
  endpoints: (builder) => ({
    // GET /wealth-funds/
    getAllWealthFunds: builder.query<any[], void>({
      query: () => `/wealth-funds/`,
      providesTags: ["WealthFund"],
    }),

    // GET /wealth-funds/{fund_id}
    getWealthFundById: builder.query<any, number>({
      query: (fund_id) => `/wealth-funds/${fund_id}`,
      providesTags: ["WealthFund"],
    }),

    // POST /wealth-funds/
    createWealthFund: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/wealth-funds/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["WealthFund"],
    }),

    // PUT /wealth-funds/{fund_id}
    updateWealthFund: builder.mutation<
      any,
      { fund_id: number; body: Partial<any> }
    >({
      query: ({ fund_id, body }) => ({
        url: `/wealth-funds/${fund_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["WealthFund"],
    }),

    // DELETE /wealth-funds/{fund_id}
    deleteWealthFund: builder.mutation<any, number>({
      query: (fund_id) => ({
        url: `/wealth-funds/${fund_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WealthFund"],
    }),
  }),
});

export const {
  useGetAllWealthFundsQuery,
  useGetWealthFundByIdQuery,
  useCreateWealthFundMutation,
  useUpdateWealthFundMutation,
  useDeleteWealthFundMutation,
} = wealthFundsAPI;
