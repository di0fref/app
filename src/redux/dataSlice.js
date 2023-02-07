import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import "../http-common.js"
import {da} from "date-fns/locale";

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
            return response.data
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

        console.log(column)
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
            const response= await axios.post("/cards/reorder", cards)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addLabelToTask = createAsyncThunk(
    'data/addLabelToTask',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("/cards/addlabel", data)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const removeLabelFromTask = createAsyncThunk(
    'data/removeLabelFromTask',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post("/cards/removelabel", data)
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
    currentCard: null,
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
        setCurrentCard: (state, action) => {
            state.currentCard = action.payload
        },
        setBoard: (state, action) => {
            // state.project = {
            //     ...state.project.columns,
            //     columns: action.payload
            // }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProject.fulfilled, (state, action) => {
                state.project = action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.id)

                state.project.columns[columnIndex].cards.unshift(action.payload)

            })
            .addCase(updateTask.fulfilled, (state, action) => {

                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.id)

                state.project.columns[columnIndex].cards[cardIndex] = {
                    ...state.project.columns[columnIndex].cards[cardIndex],
                    ...action.payload
                }

            })
            .addCase(getColumns.fulfilled, (state, action) => {
                state.columns = action.payload
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                console.log(action);
            })
            .addCase(addColumn.fulfilled, (state, action) => {
                state.project.columns.push(action.payload)
            })
            .addCase(reorderTasks.fulfilled, (state, action) => {
                //

                // console.log(action.payload);
                // action.payload.cards.map(data => {
                //
                //     const columnIndex = state.project.columns.find(column => column.id === action.payload.source.fromColumnId)
                //     // const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === data.id)
                //
                //
                //     console.log(columnIndex.title);
                    //
                    // state.project.columns[columnIndex].cards[cardIndex] = {
                    //     ...state.project.columns[columnIndex].cards[cardIndex],
                    //     ...data
                    // }
                // })

            })
            .addCase(addLabelToTask.fulfilled, (state, action) => {
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                const card = state.project.columns[columnIndex].cards.find(card => card.id === action.payload.cardId)
                card.labels.unshift(action.payload.label)
            })
            .addCase(removeLabelFromTask.fulfilled, (state, action) => {
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                const card = state.project.columns[columnIndex].cards.find(card => card.id === action.payload.cardId)
                const labelIndex = card.labels.findIndex(label => label.id === action.payload.label.id)

                card.labels.splice(labelIndex, 1)

            })


    }


})
export const {
    connectionEstablished,
    startConnecting,
    setUser,
    setAccessToken,
    setCurrentCard,
    setBoard
} = dataSlice.actions

export default dataSlice.reducer
