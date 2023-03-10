import {Dialog, Transition, Popover} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineXMark} from "react-icons/hi2";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {setCurrentCard, updateTask, deleteCard, getUpdatedCard} from "../redux/dataSlice";
import {
    BsCalendar,
    BsCardText,
    BsTextLeft,
    BsX,
    BsCheck,
    BsArchiveFill,
    BsArchive,
    BsTag,
    BsTrash,
    BsDash
} from "react-icons/bs";
import Description from "./Description";
import LabelManager from "./LabelManager";
import DatePicker from "react-datepicker";
import CustomDatePicker from "./CustomDatePicker";
import {format} from "date-fns";
import {dbDateFormat} from "../helper";
import TextareaAutosize from "react-textarea-autosize"
import FieldManager from "./FieldManager";
import CardFields from "./CardFields";
import {socket} from "../redux/store";
import {TiArchive} from "react-icons/ti";
import {
    HiArrowCircleRight,
    HiCheck,
    HiOutlineArchive,
    HiOutlineTag,
    HiRefresh,
    HiTag,
    HiTrash,
    HiUser
} from "react-icons/hi";
import ChecklistManager from "./ChecklistManager";
import Checklist from "./Checklist";
import {toast} from "react-toastify";
import {usePopper} from "react-popper";
import CardUserManager from "./CardUserManager";
import {Avatar} from "./GoogleHead";
import CardActivity from "./CardActivity";
import {Comments, AddComment} from "./Comments";

export function CardModelButton({icon, value, onClick, ...props}) {
    return (
        <div onClick={onClick} className={`rounded-box ml-0.5 md:ml-0 hover:cursor-pointer hover:bg-modal-darker bg-modal-dark h-8 px-2 text-left ${props.className}`}>
            <div className={'flex items-center space-x-2 h-8'}>
                {icon}
                <div className={`text-sm`}>{value}</div>
            </div>
        </div>
    )
}

export function CardModelButtonRed({icon, value, onClick, ...props}) {
    return (
        <div onClick={onClick} className={`rounded-box ml-0.5 md:ml-0 hover:cursor-pointer bg-orange-700 hover:bg-orange-800 text-white bg-modal-dark h-8 px-2 text-left ${props.className}`}>
            <div className={'flex items-center space-x-2 h-8'}>
                {icon}
                <div className={`text-sm flex-grow`}>{value}</div>
            </div>
        </div>
    )
}


export default function CardModal({project, ...props}) {


    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })

    let [isOpen, setIsOpen] = useState(false)
    const currentCard = useSelector(state => state.data.currentCard)
    const nav = useNavigate()
    const dispatch = useDispatch();
    const params = useParams()
    const loc = useLocation()

    const [tags, setTags] = useState([])

    const [title, setTitle] = useState(currentCard?.title)
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        if (currentCard === undefined && params.cardId) {
            nav("/board/" + params.projectId + loc.search)
            toast.error("We could not find the card. It is probably deleted.")
        } else {
            currentCard && setIsOpen(true)
            setTitle(currentCard?.title)
        }
    }, [currentCard])

    const onDeleteCard = () => {
        setIsOpen(false)
        dispatch(setCurrentCard(null))
        nav("/board/" + params.projectId + loc.search)
        dispatch(deleteCard(currentCard.id))
        socket.emit("card delete", {
            id: currentCard.id,
            room: currentCard.projectId
        })
    }

    function closeModal() {
        setIsOpen(false)
        dispatch(setCurrentCard(null))
        nav("/board/" + params.projectId + loc.search)
    }

    function openModal() {
        setIsOpen(true)
    }

    const onTitleBlur = (e) => {
        dispatch(updateTask({
            id: currentCard.id,
            title: e.target.value
        })).then(res => {

            socket.emit("card update", {
                id: currentCard.id,
                room: currentCard.projectId
            })
        })
    }
    const onDateChange = (date) => {
        dispatch(updateTask({
            id: currentCard.id,
            due: date ? format(date, dbDateFormat) : null,
        })).then(r => {
            dispatch(getUpdatedCard(currentCard.id))
            socket.emit("card update", {
                id: currentCard.id,
                room: currentCard.projectId
            })
        })
    }

    const onArchive = () => {
        dispatch(updateTask({
            status: "Archived",
            id: currentCard?.id
        })).then(r => {
            dispatch(getUpdatedCard(currentCard.id))
            socket.emit("card update", {
                id: currentCard.id,
                room: currentCard.projectId
            })
        })

    }
    const sendToBoard = () => {
        dispatch(updateTask({
            status: "",
            id: currentCard?.id
        })).then(r => {
            dispatch(getUpdatedCard(currentCard.id))
            socket.emit("card update", {
                id: currentCard.id,
                room: currentCard.projectId
            })
        })

    }
    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            className="relative z-50">
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 overflow-auto bg-black/50" aria-hidden="true"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-[600px] items-center justify-center p-4">


                    <Dialog.Panel className="md:max-w-[768px] w-11/12 transform rounded-sm bg-modal text-left align-middle shadow-xl transition-all">

                        {currentCard?.status === "Archived" ?
                            (
                                <div className={'flex items-center py-2 pl-6 space-x-2 bg-archive-warning'}>
                                    <HiOutlineArchive/>
                                    <div className={'font-semibold'}>
                                        This card is archived
                                    </div>
                                </div>
                            ) : ""}

                        <button onClick={closeModal} className={'absolute top-2 right-2'}>
                            <BsX className={'h-6 w-6'}/>
                        </button>
                        <div className={'min-h-[90vh] pl-12 pr-4 py-3'}>


                            <div className={'flex items-center space-x-2 font-semibold text-xl'}>
                                <div className={'absolute left-6'}><BsCardText className={'h-5 w-5'}/></div>
                                <div className={'text-neutral-500'}>#{currentCard?.number}</div>
                            </div>

                            <div className={'flex md:flex-row flex-col md:space-x-4 space-x-0'}>
                                <div className={'bg-amber-400_ flex-grow pr-4 '}>
                                    <div className={'mt-1'}>
                                        <TextareaAutosize
                                            onBlur={onTitleBlur}
                                            onChange={e => setTitle(e.target.value)} className={`rounded-sm
                                    resize-none
                                    px-1
                                    py-0.5
                                    w-full
                                    font-semibold
                                    text-xl
                                    border-0 
                                    bg-transparent 
                                    focus:bg-white 
                                    focus:ring-1 
                                    focus:border-0
                        
                            `} value={title}/>
                                    </div>
                                    <div className={'text-sm pl-1 mb-4 text-neutral-500'}>In
                                        list {currentCard?.column.title}
                                    </div>

                                    <div className={'flex items-center space-x-4 mb-4'}>
                                        {currentCard?.users.length ?
                                            <div className={'pl-1'}>
                                                <CardUserManager showTitle={true} button={"plus"}/>
                                            </div>
                                            : ""}
                                        {currentCard?.labels.length ?
                                            <div className={'pl-1'}>
                                                <LabelManager showLabels={true} button={"plus"} card={currentCard} project={project}/>
                                            </div> : ""}
                                    </div>

                                    <div>
                                        <div className={'flex items-center pl-1'}>
                                            <div className={'absolute left-6'}><BsTextLeft className={'h-5 w-5'}/></div>
                                            <div className={'flex items-center space-x-2'}>
                                                <div className={'font-semibold text-base'}>Description</div>
                                            </div>
                                        </div>
                                        <div className={"mb-4 mt-3 pl-1"}>
                                            <Description card={currentCard} setEdit={setEdit} edit={edit}/>
                                        </div>
                                    </div>

                                    {currentCard?.card_fields.length ?
                                        <>
                                            <div className={'flex items-center pl-1'}>
                                                <div className={'absolute left-6'}>
                                                    <svg width="22" height="22" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8H11C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6H3ZM4 16V12H20V16H4ZM2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V12Z" fill="currentColor"></path>
                                                    </svg>

                                                </div>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div className={'font-semibold text-base'}>Custom fields</div>
                                                </div>
                                            </div>
                                            <div className={"my-4 pl-1"}>
                                                <CardFields/>
                                            </div>
                                        </>
                                        : ""}

                                    {currentCard?.checklists && currentCard.checklists.map(list => (
                                        <Checklist card={currentCard} key={list.id} list={list}/>
                                    ))}

                                    <div>
                                        <CardActivity card={currentCard}/>
                                    </div>
                                </div>


                                <div className={'bg-green-600_ w-44 '}>
                                    <div className={'mb-4'}>
                                        <div className={'text-xs text-neutral-500 font-semibold mb-2 md:mt-0 mt-4 md:pl-0 pl-1'}>Due
                                            date
                                        </div>
                                        <CustomDatePicker onDateChange={onDateChange} _date={currentCard?.due}/>
                                    </div>

                                    <div className={'text-xs text-neutral-500 font-semibold mb-2 md:mt-0 mt-4 md:pl-0 pl-1'}>Add
                                        to card
                                    </div>

                                    <FieldManager showLabels={true}/>
                                    <CardUserManager project={project} showTitle={false}/>
                                    <ChecklistManager card={currentCard}/>
                                    <LabelManager showLabels={false}/>

                                    <div className={'text-xs text-neutral-500 font-semibold  mb-2 md:mt-0 pt-4 md:pl-0 pl-1'}>Actions</div>

                                    {currentCard?.status === "Archived"
                                        ? (
                                            <>
                                                <button onClick={sendToBoard} className={'mb-2'}>
                                                    <CardModelButton className={'w-44'} value={"Send to board"} icon={
                                                        <HiRefresh/>}/>
                                                </button>
                                                {/*<button onClick={onDeleteCard} className={'mb-2'}>*/}
                                                {/*    <CardModelButtonRed className={'w-44'} value={"Delete"} icon={<BsDash/>}/>*/}

                                                <Popover className={"relative"}>
                                                    <Popover.Button ref={setReferenceElement}>
                                                        <CardModelButtonRed className={'w-44'} value={"Delete"} icon={
                                                            <BsDash/>}/>
                                                    </Popover.Button>
                                                    <Popover.Panel className={'absolute top-8 right-0 z-10 mt-1 w-80'}
                                                                   ref={setPopperElement}
                                                                   style={{zIndex: 10, ...styles.popper}}
                                                                   {...attributes.popper}
                                                    >
                                                        {({close}) => (

                                                            <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                                                                <div className="relative bg-white p-4 ">
                                                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Delete card?</div>

                                                                    <button onClick={close} className={'absolute top-3 right-2'}>
                                                                        <BsX className={'h-6 w-6'}/>
                                                                    </button>

                                                                    <div className={'text-sm'}>All actions will be removed from the activity feed and you won’t be able to re-open the card. There is no undo.</div>
                                                                    <CardModelButtonRed onClick={onDeleteCard} className={'w-full text-center mt-3'} value={"Delete"}/>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popover.Panel>
                                                </Popover>

                                                {/*</button>*/}
                                            </>
                                        )
                                        : (
                                            <button onClick={onArchive} className={'mb-2'}>
                                                <CardModelButton className={'w-44'} value={"Archive"} icon={
                                                    <HiOutlineArchive className={'h-4 w-4'}/>}/>
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}
