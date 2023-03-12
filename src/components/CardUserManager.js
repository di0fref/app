import {Popover} from "@headlessui/react";
import {BsCheck, BsX} from "react-icons/bs";
import {CardModelButton} from "./CardModal";
import {HiOutlineTag, HiUser} from "react-icons/hi";
import {useState} from "react";
import {usePopper} from "react-popper";
import {useCallback, useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {Avatar} from "./GoogleHead";
import {Tooltip} from 'react-tooltip'
import {addUserToCard, getUpdatedCard, removeUserFromCard} from "../redux/dataSlice";
import Label from "./Label";

export default function CardUserManager({project, showTitle, button}) {

    const [users, setUsers] = useState([])
    const projectUsers = useSelector(state => state.data.project.users)
    const dispatch = useDispatch()
    const currentCard = useSelector(state => state.data.currentCard)

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })

    const onAddUser = (user) => {

        if (currentCard.users.findIndex(member => member.id === user.id) !== -1) {
            dispatch(removeUserFromCard({
                userId: user.id,
                cardId: currentCard.id
            })).unwrap().then(res => {
                // console.log(res)
                dispatch(getUpdatedCard(currentCard.id))
            })
        } else {
            dispatch(addUserToCard({
                userId: user.id,
                cardId: currentCard.id
            })).unwrap().then(res => {
                // console.log(res)
                dispatch(getUpdatedCard(currentCard.id))
            })
        }
    }

    return (
        <div>
            {showTitle && <div className={'text-xs text-neutral-500 font-semibold mb-2 '}>Members</div>}
            {/*<div className={"mb-6"}>*/}

                <Popover as={"div"} className={"relative mb-2"}>

                    <div className={'flex flex-wrap gap-1'}>
                        {showTitle && currentCard &&  currentCard.users && currentCard.users.map(user => {
                            return <Avatar className={"w-8 h-8 rounded-full"} key={user.id} user={user}/>
                        })}


                        <Popover.Button className={'w-full_'} ref={setReferenceElement}>
                            {button === "plus"
                                ? <div className={'w-8 h-8 bg-modal-dark font-bold py-1 rounded-full hover:bg-modal-darker'}>+</div>
                                : <CardModelButton className={'w-44'} value={"Members"} icon={<HiUser/>}/>}


                        </Popover.Button>


                    </div>


                    <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                        {({close}) => (

                            <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                                <div className="relative bg-white p-4 ">
                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Members</div>

                                    <button onClick={close} className={'absolute top-3 right-2'}>
                                        <BsX className={'h-6 w-6'}/>
                                    </button>

                                    <div className={''}>
                                        {projectUsers.map(user => (
                                            <div className={'flex items-center space-x-2 mb-2'} onClick={e => onAddUser(user)} key={user.id} data-tooltip-id={user.name} data-tooltip-content={user.name}>
                                                <button className={'rounded-box py-1 px-1 flex items-center space-x-2 w-full text-left hover:bg-modal'}>
                                                    <Avatar user={user} className={"rounded-full w-8 w-8"}/>
                                                    <div className={'text-md flex-grow'}>{user.name}</div>
                                                    <Tooltip id={user.name}/>
                                                    {(currentCard.users.findIndex(member => member.id === user.id) !== -1)
                                                        ? <div className={'flex-grow flex justify-end'}><BsCheck/></div>
                                                        : ""}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Popover.Panel>
                </Popover>
            </div>
        // </div>
    )

}
