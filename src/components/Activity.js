import {BsPersonFill} from "react-icons/bs";
import {Link} from "react-router-dom";
import {format} from "date-fns";
import {Avatar, GoogleHead} from "./GoogleHead";
import {useSelector} from "react-redux";

export default function Activity({activity}) {

    const user = useSelector(state => state.data.user)

    const ActivityText = ({arr}) => {
        if(arr)
        return (
            <div>
                <div className={'flex space-x-4 _bg-red-300 mb-4'}>
                    <Avatar user={arr.user} className={"rounded-full h-10 w-10"}/>
                    <div className={'text-sm'}>
                        <span className={'font-semibold text-black'}>{arr.user.id === user.id?"You":arr.user.name} </span>
                        <span>{arr.action} </span>
                        <span>{arr.to}</span>
                        <p className={'text-xs mt-1'}>at {format(new Date(activity.createdAt), "Y-MM-dd H:ii")}</p>
                    </div>
                </div>
            </div>
        )
    }

    const getText = () => {

        switch (activity.field) {
            case "columnId":
                return {
                    user: activity.user,
                    action: <span>Moved <Link className={"underline"} to={"/board/" + activity.card.projectId + "/card/" + activity.card.id}>{activity.card.title}</Link> to</span>,
                    to: activity.column.title,
                    link: "/board/" + activity.card.projectId + "/card" + activity.card.id
                }
                break;
            case "status":
                return {
                    user: activity.user,
                    action: <span>{activity.value==="archived"?"archived":"sent to board"} <Link className={"underline"} to={"/board/" + activity.card.projectId + "/card/" + activity.card.id}>{activity.card.title}</Link></span>,
                    to: "",
                    link: "/board/" + activity.card.projectId + "/card" + activity.card.id
                }
                break;

            case "due":
                return {
                    user: activity.user,
                    action: <span>Updated due date on <Link className={"underline"} to={"/board/" + activity.card.projectId + "/card/" + activity.card.id}>{activity.card.title}</Link></span>,
                    to: "",
                    link: "/board/" + activity.card.projectId + "/card" + activity.card.id
                }
                break;
        }
    }


    return (
        <ActivityText arr={getText()}/>
        // <></>
    )
}
