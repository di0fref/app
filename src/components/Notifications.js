import {Popover} from '@headlessui/react'
import {BsX} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {getNotifications} from "../redux/dataSlice";
import {useCallback, useState, useEffect} from "react";
import {usePopper} from "react-popper";
import {Avatar} from "./GoogleHead";
import {format} from "date-fns";
import {Link} from "react-router-dom";
import {HiOutlineBell} from "react-icons/hi";
import {useOnClickOutside} from "usehooks-ts";
import {useRef} from "react";
import axios from "axios";

const Label = ({text}) => {
    return(
        <div className={'bg-red-600 rounded-full w-2 h-2 absolute top-0 -left-1'}/>
    )
}

const Notification = ({data}) => {

    const [notification, setNotification] = useState(data)

    const formatData = useCallback(() => {
        switch (notification.action) {
            case "AddedToProject":
                return (
                    <span>
                        invited you to the board  <Link className={"underline"} to={"/board/" + notification.project.id}>{notification.project.title}</Link>
                        {notification.status === "New"?<Label text={"New"}/>:""}
                    </span>
                )

            default: return ""
        }
    }, [notification])

    useEffect(() => {
        setNotification(data)
    }, [data])

    return (
        <div>
            <div className={'flex space-x-4 _bg-red-300 mb-4 relative'}>
                <Avatar user={notification.userBy} className={"rounded-full h-10 w-10"}/>
                <div className={'text-sm'}>
                    <span className={'font-semibold text-black'}>{notification.userBy.name} </span>
                    <span>{formatData()}</span>
                    <p className={'text-xs mt-1'}>at {format(new Date(notification.createdAt), "Y-MM-dd H:ii")}</p>
                </div>
            </div>
        </div>
    )
}

export default function Notifications() {

    const notifications = useSelector(state => state.data.notifications)
    const countNew = useSelector(state => state.data.notifications.filter(not => not.status === "New")).length

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })
    const dispatch = useDispatch()
    const clickRef = useRef();

    useOnClickOutside(clickRef, onClickOutside);

    const fetchNotifications = () => {
        // dispatch(getNotifications())
    }

    function onClickOutside() {
        if (popperElement){
            axios.put('/users/notifications/reset').then(res => {
                dispatch(getNotifications())
            })
        }
    }

    return (
        <Popover as={"div"} ref={clickRef}>
            <Popover.Button className={"relative hover:bg-[#5895bb] rounded-full bg-[#537DA4] p-1 mr-4"} onClick={fetchNotifications} ref={setReferenceElement}>
                <HiOutlineBell className={'w-6 h-6 rotate-45 text-white font-bold'}/>
                {countNew > 0 && <div className={'flex items-center justify-center absolute w-5 h-5 -top-2 -right-1 bg-red-700 rounded-full text-white text-xs'}>{countNew}</div>}
            </Popover.Button>
            <Popover.Panel as={"div"} className={"w-96"} ref={setPopperElement} style={{zIndex: 20, ...styles.popper}}{...attributes.popper}>
                {({close}) => (

                    <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                        <div className="relative bg-white p-4_ ">
                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b py-4'}>Notifications</div>


                            <button onClick={() => {
                                onClickOutside()
                                close()
                            }} className={'absolute top-3 right-2'}>
                                <BsX className={'h-6 w-6'}/>
                            </button>


                            <div className={'max-h-[80vh] overflow-auto p-5'}>
                                {notifications.map(notification => {
                                    return <Notification key={notification.id} data={notification}/>
                                })}
                            </div>


                        </div>
                    </div>
                )}
            </Popover.Panel>
        </Popover>
    )
}
