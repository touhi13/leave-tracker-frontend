import { apiSlice } from '../api/apiSlice';
import { userLoggedIn, userLoggedOut } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/api/v1/register',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/v1/login',
        method: 'POST',
        body: data,

      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          console.log(response, 1);

          if (response.data.status === 'success' && response.data.data) {

            console.log(response, 2);

            localStorage.setItem(
              'auth',
              JSON.stringify({
                accessToken: response.data.data.token,
                user: response.data.data.user,
                role: response.data.data.user.role,
              })
            );
            dispatch(
              userLoggedIn({
                accessToken: response.data.data.token,
                user: response.data.data.user,
                role: response.data.data.user.role,
              })
            );
          } else {
            // Handle API error or unexpected response
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: '/api/v1/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.status === 'success') {
            localStorage.removeItem('auth');
            dispatch(userLoggedOut());
          } else {
            // Handle API error or unexpected response
          }
        } catch (err) {
          console.error(err);
        }
      },
    }),

  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;