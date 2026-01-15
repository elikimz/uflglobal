import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SignupInput {
  username: string;
  phone_number: string;
  password: string;
  invite_code?: string;
  recaptcha_token: string;
  data:string;
}

interface SignupResponse {
  id: number;
  username: string;
  phone_number: string;
  invite_code?: string;
  role: string;
  token?: string; // assuming the backend returns a JWT
}

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      // You can add global headers here if needed
      return headers;
    },
  }),
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupInput>({
      query: (body) => {
        const formData = new URLSearchParams();
        formData.append("username", body.username);
        formData.append("phone_number", body.phone_number);
        formData.append("password", body.password);
        formData.append("recaptcha_token", body.recaptcha_token);
        if (body.invite_code) formData.append("invite_code", body.invite_code);

        return {
          url: "auth/signup",
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useSignupMutation } = authAPI;
