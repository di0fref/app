import './App.css';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import Login from "./components/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import "./auth/firebase.js"
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.min.css';
import {ArrayParam, QueryParamProvider, withDefault} from 'use-query-params';
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6';
import {ToastContainer} from 'react-toastify';

function App() {

    return (
        <Provider store={store}>
            <QueryParamProvider
                adapter={ReactRouter6Adapter}
            >
                <ToastContainer
                    hideProgressBar={true}
                    className={""}
                    position="top-center"/>

                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/board/:projectId"} element={<Main/>}/>
                    <Route path={"/board/:projectId/card/:cardId"} element={<Main/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </QueryParamProvider>
        </Provider>
    )
}

export default App;
