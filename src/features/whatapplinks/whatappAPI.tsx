import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Link {
  id: number;
  whatsapp_link?: string;
  group_link?: string;
  hiring_manager_link?: string;
  created_at: string;
}

// ======================
// API Definition
// ======================

export const linksAPI = createApi({
  reducerPath: "linksAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  tagTypes: ["Links"],
  endpoints: (builder) => ({
    // 🔹 Get all links
    getLinks: builder.query<Link[], void>({
      query: () => "links/",
      providesTags: ["Links"],
    }),

    // 🔹 Get single link by ID
    getLink: builder.query<Link, number>({
      query: (id) => `links/${id}`,
      providesTags: ["Links"],
    }),

    // 🔹 Create a new link
    createLink: builder.mutation<
      { message: string; link: Link },
      Partial<Link>
    >({
      query: (body) => ({
        url: "links",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Links"],
    }),

    // 🔹 Update link by ID
    updateLink: builder.mutation<
      { message: string; link: Link },
      { id: number; data: Partial<Omit<Link, "id">> }
    >({
      query: ({ id, data }) => ({
        url: `links/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Links"],
    }),

    // 🔹 Delete link by ID
    deleteLink: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `links/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Links"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const {
  useGetLinksQuery,
  useGetLinkQuery,
  useCreateLinkMutation,
  useUpdateLinkMutation,
  useDeleteLinkMutation,
} = linksAPI;
