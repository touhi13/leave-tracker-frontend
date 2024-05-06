import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leaveRequest: {
        search_text: "", leave_type: "", status: "", start_date: "", end_date: "", per_page: 10, page: 1
    },
    user: {
        search_text: "", status: "", start_date: "", end_date: "", per_page: 10, page: 1
    },
    userLeaveRequest: {
        search_text: "", status: "", start_date: "", end_date: "", per_page: 10, page: 1
    }
};

const cacheKeySlice = createSlice({
    name: 'cacheKey',
    initialState,
    reducers: {
        updateCacheKey(state, action) {
            const { key, payload } = action.payload;
            state[key] = {
                ...state[key],
                ...payload,
            };
        }
    }
});

export const { updateCacheKey } = cacheKeySlice.actions;
export default cacheKeySlice.reducer;
