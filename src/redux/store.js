import {configureStore} from '@reduxjs/toolkit'
import dataReducer, {getUpdatedCard, setBoard, getNewCard, getNotifications} from "./dataSlice"
import {startConnecting, connectionEstablished} from "./dataSlice";
import io from "socket.io-client"

const logger = store => next => action => {
    // console.group(action.type)
    // console.info('dispatching', action)
    let result = next(action)
    // console.log('next state', store.getState())
    // console.groupEnd()
    return result
}
export let socket;

// const jwt = localStorage.getItem("accessToken")
const socketMiddleware = store => {

    return next => action => {
        // const isConnectionEstablished = socket && store.getState().data.isConnected;

        if (startConnecting.match(action)) {
            socket = io.connect("ws://localhost:8000", {
                auth: {token: `Bearer ${store.getState().data.accessToken}`}
            })

            socket.on('connect', () => {
                store.dispatch(connectionEstablished());

                socket.emit("init", {
                    userId: store.getState().data.user.id,
                    userName: store.getState().data.user.name,
                })

                store.getState().data.projects.forEach(project => {
                    socket.emit("join", {
                        room: project.id,
                        name: store.getState().data.user.name
                    })
                })
            })
            socket.on("comment new", (data) => {
                store.dispatch(getNewCard(data.id))
            })
            socket.on("card new", (data) => {
                store.dispatch(getNewCard(data.id))
            })
            socket.on("card reorder", (data) => {
                store.dispatch(setBoard(data.board))
            })
            socket.on("card update", (data) => {
                store.dispatch(getUpdatedCard(data.id))
            })
            socket.on("project shared", (data) => {
                if (data.email === store.getState().data.user.email) {
                    store.dispatch(getNotifications())
                }
            })
        }
        next(action);
    }
}


export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, socketMiddleware),

    reducer: {
        data: dataReducer,
    },
})


window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
