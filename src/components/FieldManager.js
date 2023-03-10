import {Menu} from "@headlessui/react";
import {useState} from "react";
import {Popover, Disclosure, Transition} from '@headlessui/react'
import {BsArrowLeft, BsCheck, BsPencil, BsPlus, BsX} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {addLabelToTask, removeLabelFromTask} from "../redux/dataSlice"
import Label from "./Label";
import AddLabel from "./AddLabel";
import SmallModal from "./SmallModal";
import {CardModelButton} from "./CardModal";
import AddField from "./AddField";
import {HiChevronRight} from "react-icons/hi";

export default function FieldManager({project__}) {

    const project = useSelector(state => state.data.project)

    const fields = useSelector(state => state.data.project.project_fields)


    const dispatch = useDispatch();
    const currentCardLabels = useSelector(state => state.data.currentCard?.lables)
    const currentCard = useSelector(state => state.data.currentCard)

    const [open, setOpen] = useState(false)
    const [openModal, setModalOpen] = useState(false)

    const onCheck = (e, label) => {
        if (e.target.checked) {
            dispatch(addLabelToTask({
                card_id: currentCard.id,
                labelId: label.id
            }))
        } else {
            dispatch(removeLabelFromTask({
                card_id: currentCard.id,
                labelId: label.id
            }))
        }
    }


    const closeModal = () => {

    }
    const onClose = () => {
        setModalOpen(false)
        console.log("Close");
    }
    return (
        <div>

            <div className={"mb-2"}>
                <Popover as="div" className="relative_">

                    <Popover.Button className={'w-full'}>
                        <CardModelButton className={'w-44_ '} value={"Custom fields"} icon={
                            <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 6C2.44772 6 2 6.44772 2 7C2 7.55228 2.44772 8 3 8H11C11.5523 8 12 7.55228 12 7C12 6.44772 11.5523 6 11 6H3ZM4 16V12H20V16H4ZM2 12C2 10.8954 2.89543 10 4 10H20C21.1046 10 22 10.8954 22 12V16C22 17.1046 21.1046 18 20 18H4C2.89543 18 2 17.1046 2 16V12Z" fill="currentColor"></path>
                            </svg>
                        }/>
                    </Popover.Button>

                    <Popover.Panel as={"div"} className="absolute top-4 right-4 z-10 mt-1 w-80 ">

                        {({close}) => (
                            <div className="overflow-auto_ rounded shadow-all min-h-[24rem] _max-h-[60vh] ring-1 ring-black ring-opacity-5 bg-white">
                                <div className="relative bg-white p-4 ">
                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Custom
                                        fields
                                    </div>

                                    <button onClick={close} className={'absolute top-2 right-2'}>
                                        <BsX className={'h-6 w-6'}/>
                                    </button>

                                    {/*{!openModal&&*/}
                                        <div className={'mb-8'}>
                                        {fields && fields.map((field) => (
                                            <div key={field.id} className={'flex items-center mb-2 w-full '}>

                                                <div className={'flex rounded-box items-center w-full bg-modal hover:cursor-pointer hover:bg-modal-dark'}>
                                                    <div className={' w-full text-md py-1 px-2'}>{field.title}</div>
                                                    <div className={'pr-2'}><HiChevronRight/></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                {/*}*/}

                                    <Disclosure as={"div"} onClose={onClose}>
                                        {({close}) => (
                                            <>
                                                <Disclosure.Button onClick={() => setModalOpen(true)} className={'cancel-btn bg-modal hover:bg-modal-dark w-full'}>
                                                    Create new field
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="h-full _absolute z-50 top-0 left-0 bg-white">
                                                    <button onClick={close} className={'absolute h-6 w-6 top-3 left-4'}>
                                                        <BsArrowLeft/>
                                                    </button>
                                                    <AddField close={close}/>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </div>
                        )}
                    </Popover.Panel>
                </Popover>
            </div>
        </div>
    )
}

