import { apiSlice } from '../api/apiSlice';

export const leaveRequestsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLeaveRequests: builder.query({
            query: (params) => ({
                url: '/api/v1/leave-request',
                params
            }),
        }),
        getLeaveRequest: builder.query({
            query: (id) => `/api/v1/leave-request/${id}`,
        }),
        getLeaveRequestCount: builder.query({
            query: () => `/api/v1/leave-request-count`,
        }),
        addLeaveRequest: builder.mutation({
            query: ({ data }) => ({
                url: '/api/v1/leave-request/save',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                // Pessimistic cache update
                try {
                    const { data: newLeaveRequest } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getLeaveRequests', arg.leaveRequestCacheKey,
                            (draft) => {
                                draft.data.unshift(newLeaveRequest.data);

                            }
                        )
                    );
                } catch (error) {
                    console.error('Error updating query data:', error);
                }
            },
        }),
        manageLeaveRequest: builder.mutation({
            query: ({ formData }) => {
                // console.log(data);
                return {
                    url: `/api/v1/leave-request/${formData.id}`,
                    method: 'PUT',
                    body: formData,
                }
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                console.log(arg)
                try {
                    const { data: updatedLeaveRequest } = await queryFulfilled;
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getLeaveRequests', arg.leaveRequestCacheKey,
                            (draft) => {
                                const index = draft.data.data.findIndex(
                                    (leaveRequest) => leaveRequest.id == arg.formData.id
                                );
                                draft.data.data[index] = updatedLeaveRequest.data;
                            }
                        )
                    );
                    dispatch(
                        apiSlice.util.updateQueryData(
                            'getLeaveRequest', arg.formData.id.toString(),
                            () => {
                                // console.log("hjshdjahd")
                                return updatedLeaveRequest;
                            }
                        )
                    );
                } catch (error) {
                    // console.error(error);
                    // throw error;
                }
            },
        }),


        deleteLeaveRequest: builder.mutation({
            query: ({ id }) => ({
                url: `/api/v1/leaveRequests/delete/${id}`,
                method: 'GET',
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getLeaveRequests', arg.leaveRequestCacheKey,
                        (draft) => {
                            const index = draft.data.findIndex(
                                (leaveRequest) => leaveRequest.id == arg.data.id
                            );
                            if (index !== -1) {
                                console.log(index)
                                draft.data.splice(index, 1);

                                draft.statistics.draft_count = Number(draft.statistics.draft_count);
                                draft.statistics.draft_count -= 1;
                                draft.statistics.total_count -= 1;
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo();
                }
            },
        }),

    }),
});

export const {
    useAddLeaveRequestMutation,
    useDeleteLeaveRequestMutation,
    useManageLeaveRequestMutation,
    useGetLeaveRequestQuery,
    useGetLeaveRequestsQuery,
    useGetLeaveRequestCountQuery
} = leaveRequestsApi;
