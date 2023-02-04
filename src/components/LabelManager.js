import {Menu} from "@headlessui/react";
import {useState} from "react";
import {Popover} from '@headlessui/react'
import {BsPencil, BsPlus} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {addLabelToTask, removeLabelFromTask} from "../redux/dataSlice"
import Label from "./Label";

export default function LabelManager({project}) {

    const [labels, setLabels] = useState(project?.labels)
    const dispatch = useDispatch();
    const currentCardLabels = useSelector(state => state.data.currentCard.lables)
    const currentCard = useSelector(state => state.data.currentCard)

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

    return (
        <div>
            <div className={'text-xs text-neutral-500 font-semibold mb-2'}>Labels</div>

            <div className={""}>

                <div className={'flex flex-wrap gap-1'}>
                    {currentCard && currentCard.labels && currentCard.labels.map(label => {
                        return <Label label={label}/>
                    })}
                </div>
                <Popover className="relative_">

                    <Popover.Button>
                        <div className={'h-7 w-7 bg-neutral-200 mt-1.5 rounded'}>
                            <BsPlus className={'font-semibold h-7 w-7 '}/></div>
                    </Popover.Button>

                    <Popover.Panel className="absolute top-4 left-4 z-10 mt-1 w-screen w-[16rem] transform px-4 sm:px-0 lg:max-w-3xl">
                        <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative_ bg-white p-4 ">
                                <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center'}>Labels</div>

                                {labels.map((label) => (
                                    <div className={'flex items-center space-x-4 mb-4'}>
                                        <div>
                                            <input checked={currentCard.labels.find(lab => lab.id === label.id)?1:0 } onChange={e => onCheck(e, label)} type={"checkbox"}/>
                                        </div>
                                        <div className={'flex items-center space-x-2'}>
                                            <div style={{backgroundColor: label.color}} className={`w-44 px-2 py-1 flex items-center space-x-2 rounded`}>
                                                <div style={{
                                                    backgroundColor: label.color
                                                }} className={'h-3 w-3 rounded-full brightness-90'}></div>
                                                <div className={'text-md'}>{label.title}</div>
                                            </div>
                                            <div><BsPencil className={'text-neutral-500 h-3 w-3'}/></div>
                                        </div>
                                    </div>
                                ))}

                                <button className={'cancel-btn bg-modal hover:bg-modal-dark w-full'}>Create new label</button>

                            </div>
                        </div>

                    </Popover.Panel>
                </Popover>
            </div>
        </div>
    )
}

