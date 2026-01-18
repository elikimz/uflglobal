import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ======================
// Interfaces
// ======================

export interface Contact {
  id: number;
  safaricom_number?: string;
  airtel_number?: string;
  safaricom_name?: string;
  airtel_name?: string;
  whatsapp_number?: string;
  created_at: string;
}

// ======================
// API Definition
// ======================

export const contactsAPI = createApi({
  reducerPath: "contactsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    // Token removed as requested
  }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    // 🔹 Get all contacts
    getContacts: builder.query<Contact[], void>({
      query: () => "contacts/",
      providesTags: ["Contacts"],
    }),

    // 🔹 Get single contact by ID
    getContact: builder.query<Contact, number>({
      query: (id) => `contacts/${id}`,
      providesTags: ["Contacts"],
    }),

    // 🔹 Create a new contact
    createContact: builder.mutation<
      { message: string; contact: Contact },
      Partial<Contact>
    >({
      query: (body) => ({
        url: "contacts/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contacts"],
    }),

    // 🔹 Update contact by ID (exclude id from body)
    updateContact: builder.mutation<
      { message: string; contact: Contact },
      { id: number; data: Partial<Omit<Contact, "id">> }
    >({
      query: ({ id, data }) => ({
        url: `contacts/${id}`,
        method: "PUT",
        body: data, // id is excluded automatically
      }),
      invalidatesTags: ["Contacts"],
    }),

    // 🔹 Delete contact by ID
    deleteContact: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

// ======================
// Hooks Export
// ======================

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactsAPI;
