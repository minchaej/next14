import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, Status } from '../types/User';

interface ApiResponse {
    users: User[];
    total: number;
    page: number;
    limit: number;
}

interface UserState {
    users: User[];
    total: number;
    page: number;
    limit: number;
}

const initialState: UserState = {
    users: [],
    total: 0,
    page: 1,
    limit: 10,
};

interface FetchUsersParams {
    page: number;
    limit: number;
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ page, limit }: FetchUsersParams) => {
        const response = await fetch(`http://localhost:3000/api/users?page=${page}&limit=${limit}`);
        const data: ApiResponse = await response.json();
        return data;
    }
);

export const updateUserStatus = createAsyncThunk(
    'users/updateUserStatus',
    async (updatedUser: User) => {
        const response = await fetch(`/api/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (!response.ok) {
            throw new Error('Failed to update user status');
        }

        return await response.json();
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.total = action.payload.total;
        });
        builder.addCase(updateUserStatus.fulfilled, (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        });
    },
});

export const { setPage, setLimit } = userSlice.actions;
export default userSlice.reducer;
