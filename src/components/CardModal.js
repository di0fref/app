import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineXMark} from "react-icons/hi2";
import {useNavigate, useParams} from "react-router-dom";
import {setCurrentCard, updateTask} from "../redux/dataSlice";
import {BsCalendar, BsCardText, BsTextLeft, BsX, BsCheck, BsArchiveFill, BsArchive, BsTag} from "react-icons/bs";
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
import {HiArrowCircleRight, HiCheck, HiOutlineArchive, HiOutlineTag, HiRefresh, HiTag, HiUser} from "react-icons/hi";
import ChecklistManager from "./ChecklistManager";
import Checklist from "./Checklist";

export function CardModelButton({icon, value, onClick, ...props}) {
    return (
        <div onClick={onClick} className={`${props.className} rounded-box  ml-0.5 md:ml-0 hover:cursor-pointer hover:bg-modal-darker bg-modal-dark h-8 px-2`}>
            <div className={'flex items-center space-x-2 h-8'}>
                {icon}
                <div className={`text-sm`}>{value}</div>
            </div>
        </div>
    )
}

export default function CardModal({project, ...props}) {
    let [isOpen, setIsOpen] = useState(false)
    const currentCard = useSelector(state => state.data.currentCard)
    const nav = useNavigate()
    const dispatch = useDispatch();
    const params = useParams()
    const [tags, setTags] = useState([])

    const [title, setTitle] = useState(currentCard?.title)
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        currentCard && setIsOpen(true)
        setTitle(currentCard?.title)
    }, [currentCard])

    function closeModal() {
        setIsOpen(false)
        dispatch(setCurrentCard(null))
        // nav("/project/" + params.projectId)
        nav(-1)
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
        }))
    }

    const onArchive = () => {
        dispatch(updateTask({
            status: "archived",
            id: currentCard?.id
        }))
    }
    const sendToBoard = () => {
        dispatch(updateTask({
            status: "",
            id: currentCard?.id
        }))
    }
    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            className="relative z-50">
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 overflow-auto bg-black/50" aria-hidden="true"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">


                    <Dialog.Panel className="md:max-w-4xl w-11/12 transform rounded-sm bg-modal text-left align-middle shadow-xl transition-all">

                        <div className={`${currentCard?.status === "archived" ? "bg-archive-warning" : ""} h-10`}>
                            {currentCard?.status === "archived" ?
                                <div className={'flex items-center pt-2 pl-6 space-x-2'}>
                                    <HiOutlineArchive/>
                                    <div className={'font-semibold'}>
                                        This card is archived
                                    </div>
                                </div>
                                : ""}
                            <button onClick={closeModal} className={'absolute top-2 right-2'}>
                                <BsX className={'h-6 w-6'}/>
                            </button>
                        </div>
                        <div className={'min-h-[90vh] pl-12 pr-4 py-3'}>


                            <div className={'flex items-center space-x-2 font-semibold text-xl'}>
                                <div className={'absolute left-6'}><BsCardText className={'h-5 w-5'}/></div>
                                <div className={'text-neutral-500'}>#{currentCard?.number}</div>
                            </div>

                            <div className={'flex md:flex-row flex-col md:space-x-4 space-x-0'}>
                                <div className={'_bg-amber-400 flex-grow '}>
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

                                    <div className={'pl-1'}>
                                        <LabelManager card={currentCard} project={project}/>
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

                                    <div>

                                        <div className={'flex items-center pl-1'}>
                                            <div className={'absolute left-6'}><BsTextLeft className={'h-5 w-5'}/></div>
                                            <div className={'flex items-center space-x-2'}>
                                                <div className={'font-semibold text-base'}>Description</div>
                                                <div>
                                                    <button onClick={() => {
                                                        setEdit(true)
                                                    }} className={'py-1 px-2 bg-neutral-200 text-sm rounded hover:bg-neutral-300'}>Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={"mt-4 pl-1"}>
                                            <Description card={currentCard} setEdit={setEdit} edit={edit}/>
                                        </div>

                                    </div>

                                    {currentCard?.checklists && currentCard.checklists.map(list => (
                                        <Checklist card={currentCard} key={list.id} list={list}/>
                                    ))}

                                </div>
                                <div className={'bg-green-600_ w-44'}>
                                    <div className={'mb-4'}>
                                        <div className={'text-xs text-neutral-500 font-semibold mb-2 md:mt-0 mt-4 md:pl-0 pl-1'}>Due
                                            date
                                        </div>
                                        <CustomDatePicker onDateChange={onDateChange} _date={currentCard?.due}/>
                                    </div>

                                    <div className={'text-xs text-neutral-500 font-semibold mb-2 md:mt-0 mt-4 md:pl-0 pl-1'}>Add
                                        to card
                                    </div>

                                    <FieldManager/>

                                    <button onClick={() => {
                                    }} className={'mb-2'}>
                                        <CardModelButton className={'w-44'} value={"Member"} icon={<HiUser/>}/>
                                    </button>

                                    <ChecklistManager/>

                                    <button onClick={() => {
                                    }} className={'mb-4'}>
                                        <CardModelButton className={'w-44'}  value={"Label"} icon={<HiOutlineTag/>}/>
                                    </button>

                                    <div className={'text-xs text-neutral-500 font-semibold  mb-2 md:mt-0 mt-4 md:pl-0 pl-1'}>Actions</div>

                                    {currentCard?.status === "archived"
                                        ? (
                                            <button onClick={sendToBoard} className={'mb-2'}>
                                                <CardModelButton className={'w-44'}  value={"Send to board"} icon={<HiRefresh/>}/>
                                            </button>
                                        )
                                        : (
                                            <button onClick={onArchive} className={'mb-2'}>
                                                <CardModelButton className={'w-44'}  value={"Archive"} icon={
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
