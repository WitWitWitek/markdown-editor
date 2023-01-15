import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFileContent = createAsyncThunk('file/fetchFileContent', async (fileName, { rejectWithValue }) => {
    try {
        const response = await fetch('/api/files/' + fileName)
        if (!response.ok) {
            const { message } = await response.json()
            throw new Error(message)
        }
        const { fileContent } = await response.json()
        return { fileContent, fileName };
    } catch(err) {
        return rejectWithValue(err.message)
    }
});

export const updateFile = createAsyncThunk('file/updateFile', async ({fileName: updatedFile, fileContent}, { rejectWithValue }) => {
    try {
        const response = await fetch('/api/files/' + updatedFile, {
            method: 'PUT',
            body: JSON.stringify({fileContent}),
        })
        const { message, fileName } = await response.json();
        if (!response.ok) {
            throw new Error(message)
        }
        return { message, fileName }
    } catch (err) {
        return rejectWithValue(err.message)
    }
});

export const saveFile = createAsyncThunk('file/saveFile', async (fileData, { rejectWithValue }) => {
    try {
        const response = await fetch('/api/files', {
            method: 'POST',
            body: JSON.stringify({...fileData}),
        })
        const { message, fileName } = await response.json();
        if (!response.ok) {
            throw new Error(message)
        }
        return { message, fileName }
    } catch (err) {
        return rejectWithValue(err.message)
    }
});

export const deleteFile = createAsyncThunk('file/deleteFile', async (fileName, { rejectWithValue }) => {
    try {
        const response = await fetch('/api/files/' + fileName, {
            method: 'DELETE',
        })
        const { message } = await response.json();
        if (!response.ok) {
            throw new Error(message)
        }
        return message;
    } catch (err) {
        return rejectWithValue(err.message)
    }
    
})

const fileDataSlice = createSlice({
    name: 'file-data',
    initialState: {
        fileName: '',
        fileContent: '',
        status: 'idle', // 'loading', 'error', 'success'
        statusMessage: '',
        error: null,
    },
    reducers: {
        setFileContent(state, action) {
            state.fileContent = action.payload
        },
        setFileName(state, action) {
            state.fileName = action.payload
        },
        clearStatus(state) {
            state.status = 'idle'
        },
        clearFileData(state, action) {
            state.fileName = ''
            state.fileContent = ''
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFileContent.rejected, (state, action) => {
                state.status = 'error';
                state.statusMessage = '';
                state.error = action.payload;
            })
            .addCase(fetchFileContent.fulfilled, (state, action) => {
                state.status = 'succeess';
                state.fileName = action.payload.fileName.includes('.md') ? action.payload.fileName : action.payload.fileName + '.md'
                state.fileContent = action.payload.fileContent;
            })
            .addCase(saveFile.fulfilled, (state, action) => {
                state.status = 'success';
                state.fileName = action.payload.fileName;
                state.statusMessage = action.payload.message;
                state.error = null;
            })
            .addCase(saveFile.rejected, (state, action) => {
                state.status = 'error';
                state.statusMessage = '';
                state.error = action.payload;
            })
            .addCase(updateFile.fulfilled, (state, action) => {
                state.status = 'success';
                state.fileName = action.payload.fileName;
                state.statusMessage = action.payload.message;
                state.error = null;
            })
            .addCase(updateFile.rejected, (state, action) => {
                state.status = 'error';
                state.statusMessage = '';
                state.error = action.payload;
            })
            .addCase(deleteFile.rejected, (state, action) => {
                state.status = 'error';
                state.statusMessage = '';
                state.error = action.payload;
            })
            .addCase(deleteFile.fulfilled, (state, action) => {
                state.status = 'success';
                state.statusMessage = action.payload;
                state.fileName = '';
                state.fileContent = '';
            })
    }
})

export const { setFileContent, setFileName, clearFileData, clearStatus } = fileDataSlice.actions;
export const selectFileData = (state) => state.fileData;
export default fileDataSlice.reducer;