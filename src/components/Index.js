import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProjects} from "../redux/dataSlice"
import {Link} from "react-router-dom";


const ProjectBox = ({project}) => {
    return (
        <Link to={"/project/" + project.id}>
            <div className={'bg-[#127bbd] text-white bg-modal w-[177px] h-[80px] p-2 font-semibold rounded-box'}>{project.title}</div>
        </Link>
    )
}


export default function Index() {

    const projects = useSelector(state => state.data.projects)
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getProjects())
    // }, [])

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
