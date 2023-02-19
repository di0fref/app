import './App.css';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import Login from "./components/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./components/Main";
import "./auth/firebase.js"
import "react-datepicker/dist/react-datepicker.css";
import {ArrayParam, QueryParamProvider, withDefault} from 'use-query-params';
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6';

function App() {

    return (
        <Provider store={store}>
            <QueryParamProvider
                adapter={ReactRouter6Adapter} options={{
                params: {
                    labels: withDefault(ArrayParam, []),
                    due: withDefault(ArrayParam, []),
                }
            }}>
                <Routes>
                    <Route path={"/"} element={<Main/>}/>
                    <Route path={"/project/:projectId"} element={<Main/>}/>
                    <Route path={"/project/:projectId/card/:cardId"} element={<Main/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </QueryParamProvider>
        </Provider>
    )
}

export default App;
