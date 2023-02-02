import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import "../http-common.js"

export const getProject = createAsyncThunk(
    'data/getProject',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get("/projects/" + id)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const addTask = createAsyncThunk(
    'data/addTask',
    async (task, thunkAPI) => {
        try {
            const response = await axios.post("/cards", task)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const updateTask = createAsyncThunk(
    'data/updateTask',
    async (task, thunkAPI) => {
        try {
            const response = await axios.put("/cards", task)
            return {
                old: task,
                new: response.data
            }
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const updateColumn = createAsyncThunk(
    'data/updateColumn',
    async (column, thunkAPI) => {
        console.log(column);
        try {
            const response = await axios.put("/projects/column/" + column.id, column)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addColumn = createAsyncThunk(
    'data/addColumn',
    async (column, thunkAPI) => {
        try {
            const response = await axios.post("/projects/column/add", column)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getColumns = createAsyncThunk(
    'data/getColumns',
    async (projectId, thunkAPI) => {
        try {
            const response = await axios.get("/projects/columns/" + projectId)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const reorderTasks = createAsyncThunk(
    'data/reorderTasks',
    async (cards, thunkAPI) => {
        try {
            const response = await axios.post("/cards/reorder", cards)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    project: [],
    user: [],
    accessToken: null,
    isEstablishingConnection: false,
    isConnected: false
}
export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        startConnecting: (state, action) => {
            state.isEstablishingConnection = true;
        },
        connectionEstablished: (state, action) => {
            state.isConnected = true;
            state.isEstablishingConnection = false;
        },
        submitMessage: (state, action) => {

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProject.fulfilled, (state, action) => {
                state.project = action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                /* Add to the correct project */
                const index = state.project.columns.findIndex(col => col.id == action.payload.columnId)
                state.project.columns[index].cards.unshift(action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {

                const oldColumnIndex = state.project.columns.findIndex(col => col.id === action.payload.old.oldColumnId)
                const cardIndex = state.project.columns[oldColumnIndex].cards.findIndex(card => card.id === action.payload.old.id)

                const newColumnIndex = state.project.columns.findIndex(col => col.id === action.payload.new.columnId)

                state.project.columns[oldColumnIndex].cards.splice(cardIndex,1)
                state.project.columns[newColumnIndex].cards.unshift(action.payload.new)
            })
            .addCase(getColumns.fulfilled, (state, action) => {
                console.log(action.payload);
                state.columns = action.payload
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                console.log(action);
            })
            .addCase(addColumn.fulfilled, (state, action) => {
                console.log(action.payload);
                return action.payload
            })
            .addCase(reorderTasks.fulfilled, (state, action) => {

            })
    }

})
export const {
    connectionEstablished,
    startConnecting,
    setUser,
    setAccessToken
} = dataSlice.actions

export default dataSlice.reducer
