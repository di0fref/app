import {formatDate} from "../helper";
import {FiClock} from "react-icons/fi";

export default function DateBadge({date}){

    if(!date){
        return <></>
    }

 const color = new Date(date).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
        ? "whitespace-nowrap bg-warning  text-white rounded px-2 py-1"
        : new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ? "whitespace-nowrap bg-green-500 text-white rounded px-2 py-1"
            : "whitespace-nowrap text-primary "

    return (
        <div className={`flex items-center space-x-1  ${color}`}>
            <FiClock className={`h-3 w-3`}/>
            <div className={`text-xs`}>{formatDate(date)}</div>
        </div>
    )
}
