



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// --- Interfaces ---
interface LoginRequest {
  username: string; // Can be username OR phone number
  password: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
}

// --- Phone / Password Inputs ---
interface UpdatePhoneInput {
  new_phone: string;
}

interface ChangePasswordInput {
  old_password: string;
  new_password: string;
}

interface AdminUpdatePhoneInput {
  new_phone: string;
}

interface AdminUpdatePasswordInput {
  new_password: string;
}

interface AdminSuspendUserInput {
  suspend: boolean;
}

// --- Helper to fetch stored token ---
const getAccessToken = () => localStorage.getItem("access_token");

// --- API Definition ---
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // ✅ Login mutation
    loginUser: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ username, password }) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
          grant_type: "password",
        }),
      }),
    }),

    // ✅ Update own phone
    updatePhone: builder.mutation<string, UpdatePhoneInput>({
      query: ({ new_phone }) => ({
        url: "auth/update-phone",
        method: "PUT",
        params: { new_phone },
      }),
    }),

    // ✅ Change own password
    changePassword: builder.mutation<string, ChangePasswordInput>({
      query: ({ old_password, new_password }) => ({
        url: "auth/change-password",
        method: "PUT",
        params: { old_password, new_password },
      }),
    }),

    // ✅ Admin: update user phone
    adminUpdatePhone: builder.mutation<
      string,
      { user_id: number } & AdminUpdatePhoneInput
    >({
      query: ({ user_id, new_phone }) => ({
        url: `auth/admin/update-phone/${user_id}`,
        method: "PUT",
        params: { new_phone },
      }),
    }),

    // ✅ Admin: update user password
    adminUpdatePassword: builder.mutation<
      string,
      { user_id: number } & AdminUpdatePasswordInput
    >({
      query: ({ user_id, new_password }) => ({
        url: `auth/admin/update-password/${user_id}`,
        method: "PUT",
        params: { new_password },
      }),
    }),

    // ✅ Admin: suspend/unsuspend user
    adminSuspendUser: builder.mutation<
      string,
      { user_id: number } & AdminSuspendUserInput
    >({
      query: ({ user_id, suspend }) => ({
        url: `auth/admin/suspend-user/${user_id}`,
        method: "PUT",
        params: { suspend },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useUpdatePhoneMutation,
  useChangePasswordMutation,
  useAdminUpdatePhoneMutation,
  useAdminUpdatePasswordMutation,
  useAdminSuspendUserMutation,
} = loginApi;
