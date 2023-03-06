import {Popover} from "@headlessui/react";
import {BsX} from "react-icons/bs";
import {CardModelButton} from "./CardModal";
import {HiUser} from "react-icons/hi";
import {useState} from "react";
import {usePopper} from "react-popper";
import {useCallback, useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Avatar} from "./GoogleHead";
import { Tooltip } from 'react-tooltip'
import {addUserToCard} from "../redux/dataSlice";

export default function CardUser({project}) {

    const [users, setUsers] = useState([])
    const members = useSelector(state => state.data.project.users)
    const dispatch = useDispatch()
    const currentCard = useSelector(state => state.data.currentCard)

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })

    const onAddUser = (user) => {
        dispatch(addUserToCard({
            userId: user.id,
            cardId: currentCard.id
        })).unwrap().then(res => {
            console.log(res)
        })
    }

    return (
        <Popover as={"div"} className={"relative"}>
            <Popover.Button ref={setReferenceElement}>
                <CardModelButton className={'w-44'} value={"Members"} icon={<HiUser/>}/>
            </Popover.Button>
            <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                {({close}) => (

                    <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                        <div className="relative bg-white p-4 ">
                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Members</div>

                            <button onClick={close} className={'absolute top-3 right-2'}>
                                <BsX className={'h-6 w-6'}/>
                            </button>

                            <div className={'flex items-center space-x-2'}>
                                {members.map(user => (
                                    <button onClick={e => onAddUser(user)} key={user.id} data-tooltip-id={user.name} data-tooltip-content={user.name}>
                                        <Avatar user={user} className={"rounded-full w-8 w-8"}/>
                                        <Tooltip id={user.name}/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Popover.Panel>
        </Popover>
    )
}
