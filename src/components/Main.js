import {useEffect} from "react";
import axios from "axios";
import {getProjects, setAccessToken, setUser, startConnecting} from "../redux/dataSlice";
import Project from "./Project";
import {useDispatch, useSelector} from "react-redux";
import Sidebar from "./Sidebar";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";

export default function Main() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    return (
        <div className={`
                relative 
                h-screen 
                md:flex 
                bg-[#EAECEF] 
                dark:bg-gray-900    
                _bg-gray-50
                _bg-gradient-to-br to-blue-100/50 from-[#EAECEF]
                `
        }>
            <main className={"flex h-full flex-grow _pt-12"}>
                <div className={'bg-blue-100 w-[50px] border-r dark:border-gray-700 px-2 py-4'}>
                    {/*<MainMenu/>*/}
                    <div className={'flex flex-col items-center space-y-6 mt-6'}>
                        {/*<div><FaCheckSquare className={'w-6 h-6 text-blue-500'}/></div>*/}
                        {/*<div><SearchDialog/></div>*/}
                        {/*<div><Notifications/></div>*/}
                    </div>
                </div>

                <Sidebar/>
                <div className={'h-screen overflow-y-auto w-full flex'}>
                    <div className={'flex-grow'}>
                        <div className={'px-12 max-w-3xl mx-auto h-full bg-neutral-100'}>
                            <Project/>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}