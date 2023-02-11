import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineXMark} from "react-icons/hi2";
import {useNavigate, useParams} from "react-router-dom";
import {setCurrentCard, updateTask} from "../redux/dataSlice";
import {BsCalendar, BsCardText, BsTextLeft, BsX} from "react-icons/bs";
import Description from "./Description";
import LabelManager from "./LabelManager";
import DatePicker from "react-datepicker";
import CustomDatePicker from "./CustomDatePicker";
import {format} from "date-fns";
import {dbDateFormat} from "../helper";
import TextareaAutosize from "react-textarea-autosize"

export function CardModelButton({icon, value, onClick, ...props}) {
    return (
        <button onClick={onClick} className={`${props.className} bg-modal-dark w-full h-8 px-2`}>
            <div className={'flex items-center space-x-2'}>
                {icon}
                <div className={`text-sm`}>{value}</div>
            </div>
        </button>
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
        nav("/project/" + params.projectId)
    }

    function openModal() {
        setIsOpen(true)
    }

    const onTitleBlur = (e) => {
        dispatch(updateTask({
            id: currentCard.id,
            title: e.target.value
        }))
    }
    const onDateChange = (date) => {
        dispatch(updateTask({
            id: currentCard.id,
            due: date ? format(date, dbDateFormat) : null,
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


                    <Dialog.Panel className="md:max-w-3xl w-11/12 transform rounded-sm bg-modal __dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
                        <div className={'min-h-[90vh] px-12 py-8'}>
                            <button onClick={closeModal} className={'absolute top-2 right-2'}>
                                <BsX className={'h-6 w-6'}/>
                            </button>
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
                                    <div className={'text-sm pl-1 mb-4 text-neutral-500'}>In list {currentCard?.column.title}</div>
                                    <div className={'pl-1'}>
                                        <LabelManager card={currentCard} project={project}/>
                                    </div>

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
                                </div>
                                <div className={'bg-green-600_ w-40'}>
                                    <div className={'mb-4'}>
                                        <div className={'text-xs text-neutral-500 font-semibold mb-2 md:mt-0 mt-4 md:pl-0 pl-1'}>Due date</div>

                                        <CustomDatePicker onDateChange={onDateChange} _date={currentCard?.due}/>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}