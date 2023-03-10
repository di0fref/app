import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProjects} from "../redux/dataSlice"
import {Link} from "react-router-dom";
import {Popover} from "@headlessui/react";
import {CardModelButton, CardModelButtonRed} from "./CardModal";
import {BsX} from "react-icons/bs";
import {useState, forwardRef, useImperativeHandle} from "react";
import {usePopper} from "react-popper";


const ProjectBox = ({project}) => {
    return (
        <Link to={"/board/" + project.id}>
            <div className={'bg-[#127bbd] text-white bg-modal w-[177px] h-[80px] p-2 font-semibold rounded-box'}>{project.title}</div>
        </Link>
    )
}


export default function Index() {

    const projects = useSelector(state => state.data.projects)
    const dispatch = useDispatch();

    return (
        <div className={'flex h-screen bg-modal justify-center'}>
            <div className={'grid grid-cols-4 gap-2 m-auto '}>
                {projects?.map(project => {
                    return <ProjectBox key={project.id} project={project}/>
                })}
            </div>
        </div>

    )
}
