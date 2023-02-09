import {useEffect} from "react";
import axios from "axios";
import {getProjects, setAccessToken, setCurrentCard, setUser, startConnecting} from "../redux/dataSlice";
import Project from "./Project";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate, useParams} from "react-router-dom";
import Kanban from "./Kanban";

// "@di0fref/react-kanban": "file:../react-kanban/dist",


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
        if (params.cardId && project.columns) {
            dispatch(setCurrentCard(
                project.columns
                .map((col) => col.cards)
                .flat()
                .find((card) => card.id === params.cardId)
        ))}



    }, [params.cardId, project.columns])

    return (


                <div className={'h-screen'}>
                    <div className={''}>
                            <Kanban project={project}/>
                        </div>

        </div>
    )
}
