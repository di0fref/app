import {useEffect} from "react";
import axios from "axios";
import {getProjects, setAccessToken, setCurrentCard, setUser, startConnecting} from "../redux/dataSlice";
import Project from "./Project";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate, useParams} from "react-router-dom";
import Kanban from "./Kanban";

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
        <div className={`relative h-screen md:flex`}>
            <main className={"flex h-full flex-grow _pt-12"}>


                {/*<Sidebar/>*/}
                <div className={'h-screen overflow-y-auto w-full flex'}>
                    <div className={'flex-grow'}>
                        <div className={'px-12 w-full _max-w-3xl mx-auto h-full py-10'}>
                            <Kanban project={project}/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}