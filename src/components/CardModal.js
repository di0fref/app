import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineXMark} from "react-icons/hi2";
import {useNavigate, useParams} from "react-router-dom";
import {setCurrentCard, updateTask} from "../redux/dataSlice";
import {BsCardText, BsTextLeft, BsX} from "react-icons/bs";
import Description from "./Description";
import LabelManager from "./LabelManager";

export default function CardModal({project, ...props}) {
    let [isOpen, setIsOpen] = useState(false)
    const currentCard = useSelector(state => state.data.currentCard)
    const nav = useNavigate()
    const dispatch = useDispatch();
    const params = useParams()
    const [tags, setTags] = useState([])

    const [title, setTitle] = useState(null)
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

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            className="relative z-50">
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/50" aria-hidden="true"/>

            {/* Full-screen container to center the panel */}
            <div className="justify-center items-center flex  fixed top-[5vh] left-0 right-0 z-40 outline-none focus:outline-none">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="md:max-w-3xl w-11/12 transform rounded-sm bg-modal dark:bg-gray-800 text-left align-middle shadow-xl transition-all">
                    {/*<Dialog.Title>*/}
                    {/*    <div className={'border-b dark:border-gray-700 h-10 flex justify-between items-center'}>*/}
                    {/*        <div className={'ml-3 font-semibold text-sm text-neutral-600 dark:text-neutral-200'}>{currentCard?.title}</div>*/}
                    {/*        <button onClick={closeModal}>*/}
                    {/*            <HiOutlineXMark className={'h-6 w-6 text-gray-400 mx-3 hover:bg-gray-200 rounded'}/>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</Dialog.Title>*/}
                    <div className={'min-h-[90vh] px-12 py-8'}>
                        <button onClick={closeModal} className={'absolute top-2 right-2'}><BsX className={'h-6 w-6'}/></button>
                        <div className={'flex items-center space-x-2 font-semibold text-xl'}>
                            <div className={'absolute left-6'}><BsCardText className={'h-5 w-5'}/></div>
                            <div className={'text-neutral-500'}>#{currentCard?.number}</div>
                        </div>
                        <div className={'mt-1'}>
                            <input
                                onBlur={onTitleBlur}
                                onChange={e => setTitle(e.target.value)} className={`rounded-sm
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
                        `} type={"text"} value={title}/>
                        </div>
                        <div className={'text-sm pl-1 mb-3 text-neutral-500'}>In list {currentCard?.column.title}</div>
                        <div className={'mb-2'}>
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

                            <div className={"mt-4"}>
                                <Description card={currentCard} setEdit={setEdit} edit={edit}/>
                            </div>
                        </div>
                    </div>

                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
