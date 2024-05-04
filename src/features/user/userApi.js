import { apiSlice } from '../api/apiSlice';

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (params) => ({
                url: '/api/v1/user',
                params
            }),
        }),

        updateUserStatus: builder.mutation({
            query: ({ formData }) => {
                // console.log(data);
                return {
                    url: `/api/v1/update-user-status`,
                    method: 'POST',
                    body: formData,
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg)
                try {
                    const { data: updatedUser } = await queryFulfilled;
                    console.log(updatedUser)
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getUsers', arg.userCacheKey,
                            (draft) => {
                                const index = draft.data.data.findIndex(
                                    (user) => user.id == arg.formData.user_id
                                );
                                console.log(index)
                                draft.data.data[index] = updatedUser.data;
                            }
                        )
                    );
                } catch (error) {
                    // console.error(error);
                    // throw error;
                }
            },
        })
    }),
});

export const {
    useGetUsersQuery,
    useUpdateUserStatusMutation
} = usersApi;
