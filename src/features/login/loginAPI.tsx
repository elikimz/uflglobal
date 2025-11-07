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
          grant_type: "password", // required by most FastAPI OAuth2 backends
        }),
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
