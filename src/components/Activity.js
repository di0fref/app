import {BsPersonFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import {format} from "date-fns";

export default function Activity({activity}) {


    const ActivityText = ({arr}) => {
        if(arr)
        return (
            <div>
                <div className={'flex space-x-4 _bg-red-300 mb-4'}>
                    <div><BsPersonFill className={'rounded-full h-8 w-8 bg-gray-200 p-1 text-gray-500'}/></div>
                    <div className={'text-sm'}>
                        <span className={'font-semibold text-black'}>{arr.username} </span>
                        <span>{arr.action} </span>
                        <span>{arr.to}</span>
                        <p className={'text-xs mt-1'}>at {format(new Date(activity.createdAt), "Y-MM-d H:ii")}</p>
                    </div>
                </div>
            </div>
        )
    }

    const getText = () => {

        switch (activity.field) {
            case "columnId":
                return {
                    username: activity.user.name,
                    action: <span>Moved <Link className={"underline"} to={"/project/" + activity.card.projectId + "/card/" + activity.card.id}>{activity.card.title}</Link> to</span>,
                    to: activity.column.title,
                    link: "/project/" + activity.card.projectId + "/card" + activity.card.id
                }
                break;
            case "status":
                return {
                    username: activity.user.name,
                    action: <span>archived <Link className={"underline"} to={"/project/" + activity.card.projectId + "/card/" + activity.card.id}>{activity.card.title}</Link></span>,
                    to: "",
                    link: "/project/" + activity.card.projectId + "/card" + activity.card.id
                }
                break;
        }
    }


    return (
        <ActivityText arr={getText()}/>
    )
}
