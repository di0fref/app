import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import "../http-common.js"
import {socket} from "./store";

export const getProject = createAsyncThunk(
    'data/getProject',
    async (params, thunkAPI) => {
        const {id, filter} = params
        try {
            if (filter?.due.length || filter?.labels.length) {
                // console.log("filtered")
                const response = await axios.post("/projects/filtered/" + id, filter)
                return response.data
            } else {
                // console.log("non filtered")
                const response = await axios.get("/projects/" + id)
                return response.data
            }

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

export const addLabel = createAsyncThunk(
    'data/addLabel',
    async (label, thunkAPI) => {
        try {
            const response = await axios.post("/labels", label)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const getProjects = createAsyncThunk(
    'data/getProjects',
    async (userId, thunkAPI) => {
        try {
            const response = await axios.get("/users/projects/" + userId)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addField = createAsyncThunk(
    'data/addField',
    async (field, thunkAPI) => {
        try {
            const response = await axios.post("/projects/field/add", field)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const updateField = createAsyncThunk(
    'data/updateField',
    async (field, thunkAPI) => {
        try {
            const response = await axios.put("/cards/field/update", field)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const archiveCards = createAsyncThunk(
    'data/archiveCards',
    async (cards, thunkAPI) => {
        console.log(cards);
        try {
            const response = await axios.post("/cards/archive", cards)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const getUpdatedCard = createAsyncThunk(
    'data/getUpdatedCard',
    async (id, thunkAPI) => {
        console.log(id);
        try {
            const response = await axios.get("/cards/" + id)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const getNewCard = createAsyncThunk(
    'data/getNewCard',
    async (id, thunkAPI) => {
        console.log(id);
        try {
            const response = await axios.get("/cards/" + id)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const createProject = createAsyncThunk(
    'data/createProject',
    async (project, thunkAPI) => {
        try {
            const response = await axios.post("/projects/", project)
            console.log(response)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const updateChecklistItem = createAsyncThunk(
    'data/updateChecklistItem',
    async (item, thunkAPI) => {
        try {
            const response = await axios.put("/checkitems/", item)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addChecklistItem = createAsyncThunk(
    'data/addChecklistItem',
    async (item, thunkAPI) => {
        try {
            const response = await axios.post("/checkitems/", item)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addCheckList = createAsyncThunk(
    'data/addCheckList',
    async (list, thunkAPI) => {
        try {
            const response = await axios.post("/checklist/", list)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteCheckList = createAsyncThunk(
    'data/deleteCheckList',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete("/checklist/" + id)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteCheckListItem = createAsyncThunk(
    'data/deleteCheckListItem',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete("/checkitems/" + id)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const deleteCard = createAsyncThunk(
    'data/deleteCard',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete("/cards/" + id)
            if (response.error) {
                throw thunkAPI.rejectWithValue(response.message)
            }
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const getNotifications = createAsyncThunk(
    'data/getNotifications',
    async (thunkAPI) => {
        try {
            const response = await axios.get("/users/notifications/get")
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addUserToCard = createAsyncThunk(
    'data/addUserToCard',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post("/users/toCard/add", user)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const removeUserFromCard = createAsyncThunk(
    'data/removeUserFromCard',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post("/users/toCard/delete", user)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
export const addComment = createAsyncThunk(
    'data/addComment',
    async (comment, thunkAPI) => {
        try {
            const response = await axios.post("/cards/comment/add", comment)
            return response.data
        } catch (error) {
            throw thunkAPI.rejectWithValue(error.message)
        }
    }
)
const initialState = {
    projects: [],
    project: [],
    user: [],
    notifications: [],
    accessToken: null,
    currentCard: null,
    currentProject: [],
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
        setCurrentProject: (state, action) => {
            state.project = action.payload;
        },
        setBoard: (state, action) => {
            state.project.columns = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addComment.fulfilled, (state, action) => {
                console.log(action.payload);
            })
            .addCase(removeUserFromCard.fulfilled, (state, action) => {
                // console.log(action.payload)
            })
            .addCase(addUserToCard.fulfilled, (state, action) => {
                // console.log(action.payload)
            })
            .addCase(addUserToCard.rejected, (state, action) => {
                // console.log(action.payload)
            })
            .addCase(getNotifications.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.notifications = action.payload;
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.id)

                state.project.columns[columnIndex].cards.splice(cardIndex, 1)
            })
            .addCase(deleteCheckListItem.fulfilled, (state, action) => {
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.checklist.card.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.checklist.card.id)
                const checkListIndex = state.project.columns[columnIndex].cards[cardIndex].checklists.findIndex(list => list.id === action.payload.checklistId)
                const checkListItemIndex = state.project.columns[columnIndex].cards[cardIndex].checklists[checkListIndex].checklist_items.findIndex(item => item.id === action.payload.id)

                console.log(columnIndex, cardIndex, checkListIndex, checkListItemIndex)
                state.project.columns[columnIndex].cards[cardIndex].checklists[checkListIndex].checklist_items.splice(checkListItemIndex, 1)

            })

            .addCase(deleteCheckList.fulfilled, (state, action) => {

                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.card.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.card.id)
                const checkListIndex = state.project.columns[columnIndex].cards[cardIndex].checklists.findIndex(list => list.id === action.payload.id)
                state.project.columns[columnIndex].cards[cardIndex].checklists.splice(checkListIndex, 1)
            })
            .addCase(addCheckList.fulfilled, (state, action) => {

                console.log(action.payload)
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.card.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.card.id)

                state.project.columns[columnIndex].cards[cardIndex].checklists.unshift(action.payload)

            })
            .addCase(updateChecklistItem.fulfilled, (state, action) => {
                // console.log(action.payload)

                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.checklist.card.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.checklist.card.id)
                const checkListIndex = state.project.columns[columnIndex].cards[cardIndex].checklists.findIndex(list => list.id === action.payload.checklistId)
                const checkListItemIndex = state.project.columns[columnIndex].cards[cardIndex].checklists[checkListIndex].checklist_items.findIndex(item => item.id === action.payload.id)

                state.project.columns[columnIndex].cards[cardIndex].checklists[checkListIndex].checklist_items[checkListItemIndex] = {
                    ...state.project.columns[columnIndex].cards[cardIndex].checklists[checkListIndex].checklist_items[checkListItemIndex],
                    ...action.payload
                }
                // console.log(action.payload)

            })
            .addCase(addChecklistItem.fulfilled, (state, action) => {

                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.checklist.card.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.checklist.card.id)
                const checkListIndex = state.project.columns[columnIndex].cards[cardIndex].checklists.findIndex(list => list.id === action.payload.checklistId)

                state.project.columns[columnIndex].cards[cardIndex].checklists[checkListIndex].checklist_items.push(action.payload)

            })
            .addCase(createProject.fulfilled, (state, action) => {
                console.log(action.payload)
                // return action.payload
            })
            .addCase(getNewCard.fulfilled, (state, action) => {
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                state.project.columns[columnIndex].cards.unshift(action.payload)

            })
            .addCase(getUpdatedCard.fulfilled, (state, action) => {

                console.log(action.payload)
                const columnIndex = state.project.columns.findIndex(col => col.id === action.payload.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.id)

                state.project.columns[columnIndex].cards[cardIndex] = {
                    ...state.project.columns[columnIndex].cards[cardIndex],
                    ...action.payload
                }

            })
            .addCase(archiveCards.fulfilled, (state, action) => {

                action.payload.map(id => {
                    state.project.columns.map((col, colIndex) => col.cards.map((card, cardIndex) => {
                        if (card.id === id) {
                            state.project.columns[colIndex].cards.splice(cardIndex, 1)
                        }
                    }))
                })


            })
            .addCase(updateField.fulfilled, (state, action) => {

                /* Find the card */
                const columnIndex = state.project.columns.findIndex(column => column.id === action.payload.card.columnId)
                const cardIndex = state.project.columns[columnIndex].cards.findIndex(card => card.id === action.payload.card.id)
                const fieldIndex = state.project.columns[columnIndex].cards[cardIndex].card_fields.findIndex(field => field.id === action.payload.id)

                state.project.columns[columnIndex].cards[cardIndex].card_fields[fieldIndex] = {
                    ...state.project.columns[columnIndex].cards[cardIndex].card_fields[fieldIndex],
                    value: action.payload.value
                }
            })
            .addCase(addField.fulfilled, (state, action) => {
                state.project.project_fields.unshift(action.payload)
            })
            .addCase(getProject.fulfilled, (state, action) => {
                state.project = action.payload
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.projects = action.payload
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
            .addCase(addLabel.fulfilled, (state, action) => {
                state.project.labels.push(action.payload)
            })
            .addCase(getColumns.fulfilled, (state, action) => {
                state.columns = action.payload
            })
            .addCase(updateColumn.fulfilled, (state, action) => {
                // console.log(action);
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
    setCurrentProject,
    setBoard
} = dataSlice.actions

export default dataSlice.reducer
