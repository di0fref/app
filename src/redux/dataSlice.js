import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import "../http-common.js"

export const getProjects = createAsyncThunk(
    'data/getProjects',
    async (thunkAPI) => {
        try {
            const response = await axios.get("/projects")
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

const initialState = {
    projects: [],
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
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = action.payload
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
