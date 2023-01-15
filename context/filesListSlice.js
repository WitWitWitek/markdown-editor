import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllFiles = createAsyncThunk('files/fetchAllFiles', async () => {
    const res = await fetch('/api/files');
    const { data } = await res.json()
    return data;
})

const filesListSlice = createSlice({
    name: 'files-list',
    initialState: {
        files: [],
        status: 'idle',
        error: null,
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAllFiles.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllFiles.fulfilled, (state, action) => {
                state.status = 'succeess';
                state.error = null;
                state.files = [...action.payload]
            })
            .addCase(fetchAllFiles.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message
            })
    }
})

export const selectAllFiles = (state) => state.filesList.files;
export default filesListSlice.reducer;
