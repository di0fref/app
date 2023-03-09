import {Avatar} from "./GoogleHead";
import {formatDate} from "../helper";
import {format} from "date-fns";
import {BsCheck2Square} from "react-icons/bs";
import {RxActivityLog} from "react-icons/rx";

const Activity = ({log}) => {
    return (
        <div className={'mt-4'}>
            <div className={'flex items-center space-x-4'}>
                <div><Avatar className={"rounded-full h-8 w-8"} user={log.user}/></div>
                <div>
                    <div className={'text-sm'}>{log.action} {log.module} "{log.name}"</div>
                    <div className={'text-xs text-neutral-500'}>{format(new Date(log.createdAt), "Y-MM-dd H:ii")}</div>
                </div>
            </div>
        </div>
    )
}

export default function CardActivity({card}) {

    return (
        <div className={'mb-6'}>
            <div className={'absolute left-6 mt-3'}><RxActivityLog className={'h-4 w-4'}/></div>
            <div className={'flex items-center justify-between '}>
                <div className={'font-semibold text-base my-2'}>Activity</div>
            </div>
            {card.logs.map(log => {
                return <Activity key={log.id} log={log}/>
            })}
        </div>
    )
}
