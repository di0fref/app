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
    }
    return (
        <div>
            {/*<div className={'text-xs text-neutral-500 font-semibold mb-2'}>Labels</div>*/}

            <div className={"mb-6"}>
                <Popover className="relative_">

                    {/*<div className={'flex flex-wrap gap-1'}>*/}
                    {/*    {currentCard && currentCard.labels && currentCard.labels.map(label => {*/}
                    {/*        return <Label label={label}/>*/}
                    {/*    })}*/}

                    <Popover.Button>
                        <CardModelButton value={"Custom fields"} icon={<BsCheck/>}/>
                    </Popover.Button>

                    {/*</div>*/}

                    <Popover.Panel className="absolute top-4 right-4 z-10 mt-1 w-screen w-80 ">

                        {({close}) => (
                            <div className="overflow-hidden rounded shadow-lg min-h-[24rem] ring-1 ring-black ring-opacity-5 bg-white">
                                <div className="relative bg-white p-4 ">
                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Custom
                                        fields
                                    </div>

                                    {/*{({close}) => (*/}
                                    <>
                                        <button onClick={close} className={'absolute top-2 right-2'}>
                                            <BsX className={'h-6 w-6'}/>
                                        </button>
                                    </>
                                    {/*)}*/}
                                    <div className={'mb-8'}>
                                        {fields && fields.map((field) => (
                                            <div key={field.id} className={'flex items-center mb-2 w-full '}>

                                                <div className={'flex items-center w-full bg-modal hover:cursor-pointer hover:bg-modal-dark'}>
                                                    <div className={' w-full text-md py-1 px-2'}>{field.title}</div>
                                                    <div className={'pr-2'}><HiChevronRight/></div>
                                                    {/*<div><BsPencil className={'text-neutral-500 h-3 w-3'}/></div>*/}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Disclosure as={"div"} onClose={onClose}>
                                        {({close}) => (
                                            <>
                                                <Disclosure.Button onClick={() => setModalOpen(true)} className={'cancel-btn bg-modal hover:bg-modal-dark w-full'}>
                                                    Create new field
                                                </Disclosure.Button>
                                                <Transition
                                                    className={'absolute top-0 left-0 w-full h-full'}
                                                    enter="transition ease duration-300 transform"
                                                    enterFrom="opacity-100 -translate-x-80"
                                                    enterTo="opacity-100 translate-x-0"
                                                    leave="transition ease duration-300 transform"
                                                    leaveFrom="opacity-100 translate-x-0"
                                                    leaveTo="opacity-100 -translate-x-80">
                                                    <Disclosure.Panel className="h-full absolute z-50 top-0 left-0 bg-white">
                                                        <button onClick={close} className={'absolute h-6 w-6 top-3 left-4'}>
                                                            <BsArrowLeft/>
                                                        </button>
                                                        <AddField close={close}/>
                                                    </Disclosure.Panel>
                                                </Transition>
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
