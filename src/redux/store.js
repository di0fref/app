import {applyMiddleware, combineReducers, configureStore} from '@reduxjs/toolkit'
import dataReducer, {getCard, getProject, setBoard} from "./dataSlice"
import {startConnecting, connectionEstablished} from "./dataSlice";
import io from "socket.io-client"
import {matchPath} from "react-router-dom";

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
            socket = io.connect("ws://localhost:8000", {
                auth: {token: `Bearer ${store.getState().data.accessToken}`}
            })

            socket.on('connect', () => {
                store.dispatch(connectionEstablished());

                socket.emit("init", {
                    userId: store.getState().data.user.id,
                    userName: store.getState().data.user.name,
                })

                store.getState().data.projects.map(project => {
                    socket.emit("join", {
                        room: project.id,
                        name: store.getState().data.user.name
                    })
                })
            })
            socket.on("new card", (data) => {
                console.log("new card", data);
                // console.log(data);
            })
            socket.on("card reorder", (data) => {
                console.log("card reorder", data);
                store.dispatch(setBoard(data.board))
                console.log(data.board);
            })
            socket.on("card update", (data) => {
                console.log("card updated", data);
                store.dispatch(getCard(data.id))
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
