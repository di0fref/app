import {applyMiddleware, combineReducers, configureStore} from '@reduxjs/toolkit'
import dataReducer, {getProject} from "./dataSlice"
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

const jwt = localStorage.getItem("accessToken")
const socketMiddleware = store => {

    return next => action => {
        const isConnectionEstablished = socket && store.getState().data.isConnected;

        if (startConnecting.match(action)) {
            socket = io("ws://localhost:8000", {
                auth: {token: `Bearer ${store.getState().data.accessToken}`}
            })

            socket.on('connect', () => {
                store.dispatch(connectionEstablished());
                store.dispatch(getProject(1))
            })
            socket.on("new card", (data) => {
                console.log("new card");
                // console.log(data);
            })

            socket.on("update", (data) => {
                console.log("update");
                // console.log(data);
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