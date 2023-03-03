import ChecklistItem from "./ChecklistItem";
import {BsCheck2Square, BsTextLeft, BsTrash, BsX} from "react-icons/bs";
import {useState, useEffect} from "react";
import {CardModelButton, CardModelButtonRed} from "./CardModal";
import {useDispatch} from "react-redux";
import {addChecklistItem, deleteCheckList} from "../redux/dataSlice";
import {Popover} from "@headlessui/react";
import {usePopper} from 'react-popper'
// import Pop from "./Pop";
import {toast} from "react-toastify";

export default function Checklist({list, card}) {


    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })


    const [percentage, setPercentage] = useState(0)
    const [newItem, setNewItem] = useState(false)

    const dispatch = useDispatch()

    const deleteList = () => {
        dispatch(deleteCheckList(list.id)).unwrap().then(r => {
            toast.success(`Checklist "${list.name}" removed`)
        })
    }

    const addItem = () => {
        setNewItem(true)
    }

    useEffect(() => {
        setPercentage((list.checklist_items.filter(item => item.done).length / list.checklist_items.length * 100) || 0)
    }, [list])

    return (<div className={'pl-1 my-4'}>
        <div className={'absolute left-6 mt-2.5'}><BsCheck2Square className={'h-5 w-5'}/></div>
        <div className={'flex items-center justify-between '}>
            <div className={'font-semibold text-base my-2'}>{list?.name}</div>


            <Popover as={"div"}>
                <Popover.Button ref={setReferenceElement}>
                    <CardModelButton value={"Delete"}/>
                </Popover.Button>

                <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                    {({close}) => (

                        <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                            <div className="relative bg-white p-4 ">
                                <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Delete checklist?</div>



                                <button onClick={close} className={'absolute top-3 right-2'}>
                                    <BsX className={'h-6 w-6'}/>
                                </button>



                                <div>
                                    <div className={'text-sm p-1'}>Deleting a checklist is permanent and there is no way to get it back.
                                    </div>
                                    <div className={'mt-2 text-center'}>
                                        <CardModelButtonRed onClick={deleteList} className={'text-center'} value={"Delete"}/>
                                    </div>
                                </div>



                            </div>
                        </div>
                    )}
                </Popover.Panel>
            </Popover>
        </div>

        <div className={'pl-2 mt-3'}>
            <div className="my-3 h-2 w-full bg-neutral-200 relative rounded">
                <div className={'absolute -left-9 -top-1.5 text-xs'}>{percentage}%</div>
                <div className={`${(percentage === 100) ? "bg-green-500" : "bg-blue-600"} h-2 rounded `} style={{width: percentage + "%"}}/>
            </div>
        </div>

        {list?.checklist_items.map(item => {
            return <ChecklistItem card={card} key={item.id} item={item}/>
        })}

        {newItem && <ChecklistItem card={card} setEdit={setNewItem} list={list} item={{name: ""}} isNew={true} edit={true}/>}

        {!newItem && <button onClick={addItem} className={'bg-modal-darker py-1 px-2 rounded-box ml-2 my-2 text-sm'}>Add
            item</button>}
    </div>)
}
