import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UserService from 'services/UserService';

export const initialState = {
	users: [],
  currentUser:[],
  isLoad: null,
  error: false,
}

export const fetchUsers = createAsyncThunk('userlist/userssss', async (data, { rejectWithValue }) => {
    try {
        const response = await UserService.fetchUsers(data)
        return response
    } catch (err) {
		return rejectWithValue(err.response?.data?.message || 'Error')
	}
})

export const userSlice = createSlice({
    name: 'userlist',
    initialState,
    reducers: {
        getCurrentUser: (state, action) => {
			state.currentUser = action.payload
		},
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUsers.pending, (state, action) => {
          state.isLoad = false
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.isLoad = true
          state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.isLoad = true
          state.error = true
        })
    }
})
export const {
    getCurrentUser
} = userSlice.actions
export default userSlice.reducer