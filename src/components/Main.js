import {useEffect} from "react";
import axios from "axios";
import {
    getProject,
    getProjects,
    setAccessToken,
    setCurrentCard,
    setCurrentProject,
    setUser,
    startConnecting
} from "../redux/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate, useParams} from "react-router-dom";
import Index from "./Index";
import {store} from "../redux/store";
import Navbar from "./Navbar";
import Board from "./Board";

export default function Main() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const project = useSelector(state => state.data.project)

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            console.error("Missing accessToken", "Redirecting to login");
            signOutFireBase()
            localStorage.removeItem("user")
            navigate("/login")
        } else {
            dispatch(setAccessToken(localStorage.getItem("accessToken")))
            dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
            dispatch(startConnecting())
        }
    }, [])

    useEffect(() => {
        params.projectId
            ? dispatch(getProject({
                id: params.projectId,
                filter: null
            }))
            : dispatch(setCurrentProject({}))
    }, [params.projectId])

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    useEffect(() => {
        if (params.cardId && project.columns) {
            dispatch(setCurrentCard(
                project.columns
                    .map((col) => col.cards)
                    .flat()
                    .find((card) => card.id === params.cardId)
            ))
        }
    }, [params.cardId, project?.columns])

    return (

        <>
            <Navbar/>
            <div className={'h-full'}>
                {project?.id ? <Board project={project}/> : <Index/>}
                {/*<Board project={project}/>*/}
            </div>
        </>

    )
}
