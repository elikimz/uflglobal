// src/services/companyNewsAPI.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyNewsAPI = createApi({
  reducerPath: "companyNewsAPI",
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
  tagTypes: ["CompanyNews"],
  endpoints: (builder) => ({
    // GET /company-news/
    getAllCompanyNews: builder.query<any[], void>({
      query: () => `/company-news/`,
      providesTags: ["CompanyNews"],
    }),

    // POST /company-news/
    createCompanyNews: builder.mutation<any, Partial<any>>({
      query: (body) => ({
        url: `/company-news/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["CompanyNews"],
    }),

    // PUT /company-news/{news_id}
    updateCompanyNews: builder.mutation<
      any,
      { news_id: number; body: Partial<any> }
    >({
      query: ({ news_id, body }) => ({
        url: `/company-news/${news_id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["CompanyNews"],
    }),

    // DELETE /company-news/{news_id}
    deleteCompanyNews: builder.mutation<any, number>({
      query: (news_id) => ({
        url: `/company-news/${news_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CompanyNews"],
    }),
  }),
});

export const {
  useGetAllCompanyNewsQuery,
  useCreateCompanyNewsMutation,
  useUpdateCompanyNewsMutation,
  useDeleteCompanyNewsMutation,
} = companyNewsAPI;
