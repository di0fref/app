import {Avatar} from "./GoogleHead";
import {formatDate} from "../helper";
import {format} from "date-fns";
import {BsCheck2Square} from "react-icons/bs";
import {RxActivityLog} from "react-icons/rx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import {AddComment, Comments} from "./Comments";
import {useSelector} from "react-redux";

const Activity = ({log}) => {
    return (
        // <div></div>
        <div className={'mt-4'}>
            <div className={'flex items-center space-x-4'}>
                <div><Avatar className={"rounded-full h-8 w-8"} user={log.user}/></div>
                <div>
                    <div className={'text-sm'}>
                        <span className={'font-semibold'}>{log.user.name}</span> {log.action} {log.name}</div>
                    <div className={'text-xs text-neutral-500'}>{format(new Date(log.createdAt), "Y-MM-dd H:ii")}</div>
                </div>
            </div>
        </div>
    )
}

export default function CardActivity({card}) {

    const [detailsShown, setDetailsShown] = useLocalStorage(true)
    const [p, setP] = useLocalStorage([])


    useEffect(() => {
        let p1 = [...card.logs, ...card.comments]

        // p1.sort((a, b) => {
        //     return new Date(a) - new Date(b)
        // })
console.log("Count", p1.length);
        setP(p1)
    }, [card])

    const toggleDetails = () => {
        setDetailsShown(!detailsShown)
        console.error("Not implemented")
    }

    return (
        <div className={'mb-6'}>
            <div className={'absolute left-6 mt-3'}><RxActivityLog className={'h-4 w-4'}/></div>
            <div className={'flex items-center justify-between '}>
                <div className={'font-semibold text-base my-2 pl-6'}>Activity</div>
                <div>
                    <button onClick={toggleDetails} className={'text-sm rounded-box ml-0.5 md:ml-0 hover:cursor-pointer hover:bg-modal-darker bg-modal-dark h-8 px-2 text-left'}>
                        {detailsShown ? "Hide" : "Show"} details
                    </button>
                </div>
            </div>
            <div className={'mt-3'}>
                <AddComment card={card}/>
            </div>
            {p?.map(activity => {
                console.log(format(new Date(activity.createdAt), "Y-MM-dd H:ii"));
                if (activity.field) {
                    return <Activity key={activity.id} log={activity}/>
                } else {
                    return <Comments key={activity.id} comment={activity}/>
                }
            })}

            {/*{detailsShown && card.logs.map(log => {*/}
            {/*    return <Activity key={log.id} log={log}/>*/}
            {/*})}*/}
        </div>
    )
}
