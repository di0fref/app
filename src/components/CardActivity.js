import {Avatar} from "./GoogleHead";
import {formatDate} from "../helper";
import {format} from "date-fns";
import {BsCheck2Square} from "react-icons/bs";
import {RxActivityLog} from "react-icons/rx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import {AddComment, Comments} from "./Comments";
import {useSelector} from "react-redux";
import {dateFormat} from "../helper";

const Activity = ({log, detailsShown}) => {
    return (
        // <div></div>
        <div className={`${detailsShown ? "hidden" : "block"} mt-4`}>
            <div className={'flex items-center space-x-4'}>
                <Avatar className={"rounded-full h-8 w-8"} user={log.user}/>
                <div>
                    <div className={'text-sm'}>
                        <span className={'font-semibold'}>{log.user.name}</span> {log.action} {log.name}</div>
                    <div className={'text-xs text-neutral-500'}>{formatDate(log.createdAt)}</div>
                </div>
            </div>
        </div>
    )
}

export default function CardActivity({card}) {

    const [detailsShown, setDetailsShown] = useLocalStorage(true)
    const [activities, setActivities] = useLocalStorage([])


    useEffect(() => {
        setActivities([...card.logs, ...card.comments].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        }))
    }, [card])

    const toggleDetails = () => {
        setDetailsShown(!detailsShown)
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
            {activities?.map(activity => {
                if (activity.module !== undefined) {
                    return <Activity card={card} detailsShown={detailsShown} key={activity.id} log={activity}/>
                } else {
                    return <Comments card={card} key={activity.id} comment={activity}/>
                }
            })}
        </div>
    )
}
