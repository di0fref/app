import {useEffect} from "react";
import axios from "axios";
import {
    getProject,
    getProjects,
    setAccessToken,
    setCurrentCard,
    setCurrentProject,
    setUser,
    startConnecting,
    getNotifications
} from "../redux/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate, useParams} from "react-router-dom";
import Index from "./Index";
import {store} from "../redux/store";
import Navbar from "./Navbar";
import Board from "./Board";
import {onAuthStateChanged} from "firebase/auth"
import {getAuth} from "firebase/auth";

export default function Main() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth();

    const project = useSelector(state => state.data.project)
    const connectionEstablished = useSelector(state => state.data.isConnected)
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            console.error("Missing accessToken", "Redirecting to login");
            signOutFireBase()
            localStorage.removeItem("user")
            navigate("/login")
        } else {
            dispatch(setAccessToken(localStorage.getItem("accessToken")))
            dispatch(setUser(JSON.parse(localStorage.getItem("user"))))
            dispatch(getProjects(
                JSON.parse(localStorage.getItem("user")).id
            )).then(r => {
                dispatch(startConnecting())
                dispatch(getNotifications())
            })
        }
    }, [])

    onAuthStateChanged(auth, (user) => {
            if (!user) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("user")
                navigate("/login")
            }
        }
    )

    useEffect(() => {
        params.projectId
            ? dispatch(getProject({
                id: params.projectId,
                filter: null
            }))
            : dispatch(setCurrentProject({}))
    }, [params.projectId])

    // useEffect(() => {
    //     console.log("connectionEstablished");
    //     dispatch(getProjects())
    // }, [connectionEstablished])

    useEffect(() => {
        if (params.cardId && project?.columns) {
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
            </div>
        </>

    )
}
