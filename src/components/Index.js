import {useDispatch} from "react-redux";
import {getProjects} from "../redux/dataSlice";
import {useEffect} from "react";

export default function Index(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProjects())
    }, [])

    return(
        <div className={'grid'}>
            <div>INDEX</div>
        </div>
    )
}
