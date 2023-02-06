import './App.css';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import Login from "./components/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import "./auth/firebase.js"
import Project from "./components/Project";
import {useDispatch, useSelector} from "react-redux";
import {getProjects, setUser} from "./redux/dataSlice";
import {useEffect} from "react";
import Kanban from "./components/Kanban";
import "react-datepicker/dist/react-datepicker.css";

function App() {

    return (
        <Provider store={store}>
            <Routes>
                <Route path={"/"} element={<Main/>}/>
                <Route path={"/project/:projectId"} element={<Main/>}/>
                <Route path={"/project/:projectId/card/:cardId"} element={<Main/>}/>
                <Route path={"/login"} element={<Login/>}/>
            </Routes>
        </Provider>
    )
}

export default App;
