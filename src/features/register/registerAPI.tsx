// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface SignupInput {
//   username: string;
//   phone_number: string;
//   password: string;
//   invite_code?: string;
//   recaptcha_token: string;
//   data:string;
// }

// interface SignupResponse {
//   id: number;
//   username: string;
//   phone_number: string;
//   invite_code?: string;
//   role: string;
//   token?: string; // assuming the backend returns a JWT
// }

// export const authAPI = createApi({
//   reducerPath: "authAPI",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_BASE_URL,
//     prepareHeaders: (headers) => {
//       // You can add global headers here if needed
//       return headers;
//     },
//   }),
//   tagTypes: ["Auth", "User"],
//   endpoints: (builder) => ({
//     signup: builder.mutation<SignupResponse, SignupInput>({
//       query: (body) => {
//         const formData = new URLSearchParams();
//         formData.append("username", body.username);
//         formData.append("phone_number", body.phone_number);
//         formData.append("password", body.password);
//         formData.append("recaptcha_token", body.recaptcha_token);
//         if (body.invite_code) formData.append("invite_code", body.invite_code);

//         return {
//           url: "auth/signup",
//           method: "POST",
//           body: formData,
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         };
//       },
//       invalidatesTags: ["User"],
//     }),
//   }),
// });

// export const { useSignupMutation } = authAPI;





import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface SignupInput {
  username: string;
  phone_number: string;
  password: string;
  invite_code?: string;
  recaptcha_token: string;
}

interface LoginInput {
  username: string;
  password: string;
}

interface AuthResponse {
  status: number;
  message: string;
  data?: {
    id?: number;
    username?: string;
    phone_number?: string;
    invite_code?: string;
    role?: string;
    access_token?: string;
    token?: string;
  };
}

interface ErrorResponse {
  status: number;
  data: {
    message?: string;
    detail?: string | { msg: string }[];
    error?: string;
  };
}

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Auth', 'User'],
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupInput>({
      query: (body) => {
        const formData = new URLSearchParams();
        formData.append('username', body.username);
        formData.append('phone_number', body.phone_number);
        formData.append('password', body.password);
        formData.append('recaptcha_token', body.recaptcha_token);
        if (body.invite_code) {
          formData.append('invite_code', body.invite_code);
        }

        return {
          url: 'auth/signup',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        };
      },
      transformResponse: (response: AuthResponse) => {
        // Ensure we always return an object with status and message
        return {
          status: response.status || 200,
          message: response.message || 'Success',
          data: response.data || {},
        };
      },
      transformErrorResponse: (response: ErrorResponse) => {
        // Extract and return the error message from the backend
        return {
          status: response.status,
          data: {
            message:
              response.data.message ||
              response.data.detail ||
              response.data.error ||
              'An error occurred',
            ...response.data,
          },
        };
      },
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<AuthResponse, LoginInput>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body: new URLSearchParams({
          username: body.username,
          password: body.password,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
      transformResponse: (response: AuthResponse) => {
        // Standardize the response format
        return {
          status: response.status || 200,
          message: response.message || 'Login successful',
          data: response.data || {},
          access_token: response.data?.access_token || response.data?.token,
        };
      },
      transformErrorResponse: (response: ErrorResponse) => {
        // Extract error details from the response
        let errorMessage = 'Login failed';

        if (response.data.message) {
          errorMessage = response.data.message;
        } else if (response.data.detail) {
          errorMessage =
            typeof response.data.detail === 'string'
              ? response.data.detail
              : Array.isArray(response.data.detail) &&
                  response.data.detail[0]?.msg
                ? response.data.detail[0].msg
                : JSON.stringify(response.data.detail);
        } else if (response.data.error) {
          errorMessage = response.data.error;
        }

        return {
          status: response.status,
          data: {
            message: errorMessage,
            ...response.data,
          },
        };
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authAPI;
