import {Menu} from "@headlessui/react";
import {useState} from "react";
import {Popover, Disclosure, Transition} from '@headlessui/react'
import {BsArrowLeft, BsPencil, BsPlus, BsX} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {addLabelToTask, removeLabelFromTask} from "../redux/dataSlice"
import Label from "./Label";
import AddLabel from "./AddLabel";
import SmallModal from "./SmallModal";
import {CardModelButton} from "./CardModal";
import {HiOutlineTag} from "react-icons/hi";

export default function LabelManager({project__, button, showLabels}) {

    const project = useSelector(state => state.data.project)

    const labels = useSelector(state => state.data.project.labels)


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
            {showLabels&&<div className={'text-xs text-neutral-500 font-semibold mb-2 '}>Labels</div>}

            {/*<div className={"mb-6"}>*/}
                <Popover className={``}>

                    <div className={'flex flex-wrap gap-1'}>
                        {showLabels && currentCard && currentCard.labels && currentCard.labels.map(label => {
                            return <Label key={label.id} label={label}/>
                        })}

                        <Popover.Button className={'w-full_'}>
                            {button === "plus"
                                ? <div className={'w-8 h-8 bg-modal-dark font-bold py-1 hover:bg-modal-dark'}>+</div>
                                : <CardModelButton className={'w-44'} icon={<HiOutlineTag/>} value={"Label"}/>}
                        </Popover.Button>

                    </div>

                    <Popover.Panel className="absolute top-4 right-4 z-10 mt-1 w-80 ">

                        {({close}) => (
                            <div className="overflow-hidden rounded shadow-lg min-h-[24rem] ring-1 ring-black ring-opacity-5 bg-white">
                                <div className="relative bg-white p-4 ">
                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Labels</div>

                                    <button onClick={close} className={'absolute top-2 right-2'}>
                                        <BsX className={'h-6 w-6'}/>
                                    </button>

                                    {labels && labels.map((label) => (
                                        <div key={label.id} className={'flex items-center space-x-4 mb-4'}>
                                            <div>
                                                <input className={'mb-1'} checked={currentCard?.labels.find(lab => lab.id === label.id) ? 1 : 0} onChange={e => onCheck(e, label)} type={"checkbox"}/>
                                            </div>
                                            <div className={'flex items-center space-x-2'}>
                                                <div className={'w-60'}><Label label={label}/></div>
                                                <div><BsPencil className={'text-neutral-500 h-3 w-3'}/></div>
                                            </div>
                                        </div>
                                    ))}


                                    <Disclosure as={"div"} onClose={onClose}>
                                        {({close}) => (
                                            <>
                                                <Disclosure.Button onClick={() => setModalOpen(true)} className={'cancel-btn bg-modal hover:bg-modal-dark w-full'}>
                                                    Create new label
                                                </Disclosure.Button>
                                                <Disclosure.Panel className="h-full absolute z-50 top-0 left-0 bg-white">
                                                    <button onClick={close} className={'absolute h-6 w-6 top-3 left-4'}>
                                                        <BsArrowLeft/>
                                                    </button>
                                                    <AddLabel close={close}/>
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
        // </div>
    )
}

