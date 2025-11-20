// src/wealthfund/userWealthFundAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userWealthFundAPI = createApi({
  reducerPath: "userWealthFundAPI",
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
    // GET /wealth-fund/my-investments
    getMyWealthFunds: builder.query<any[], void>({
      query: () => `/wealth-fund/my-investments`,
      providesTags: ["WealthFund"],
    }),

    // POST /wealth-fund/invest/{fund_id}
    investInWealthFund: builder.mutation<any, number>({
      query: (fund_id) => ({
        url: `/wealth-fund/invest/${fund_id}`,
        method: "POST",
      }),
      invalidatesTags: ["WealthFund"], // Refresh investments after investing
    }),
  }),
});

export const { useGetMyWealthFundsQuery, useInvestInWealthFundMutation } =
  userWealthFundAPI;
