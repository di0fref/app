import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {SortableComponent} from "./ProjectList";

export default function Sidebar() {

    // const projects = useSelector(state => state.data.projects)
    return (
        <div className={'w-64 flex-shrink-0 bg-white border-r'}>
            {/*<div className={''}>Projects</div>*/}
            {/*{projects.length ?*/}
            {/*    <SortableComponent items={projects}/>*/}
            {/*    : <div className={'bg-neutral-100 text-sm mx-2 p-2 text-neutral-600'}>*/}
            {/*        {("Create your first project and start grouping tasks together.")}*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    )
}