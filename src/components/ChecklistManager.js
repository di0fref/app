import {HiCheck} from "react-icons/hi";
import {CardModelButton} from "./CardModal";
import {Popover} from '@headlessui/react'
import {BsCheck2Square, BsX} from "react-icons/bs";
import {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {addCheckList} from "../redux/dataSlice";
import {Pop} from "./Pop";
import {usePopper} from "react-popper";

export default function ChecklistManager({card}) {

    const [name, setName] = useState("Checklist")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()


    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })

    const onCreateList = (close) => {
        if (name === "") {
            setError(true)
            return
        }
        dispatch(addCheckList({
            cardId: card.id,
            name: name
        })).then(r => {
            close()
            setName("Checklist")
        })
    }

    return (

        <Popover as={"div"}>
            <Popover.Button ref={setReferenceElement} className={'mb-2'}>
                <CardModelButton className={'w-44'} value={"Checklist"} icon={<BsCheck2Square/>}/>
            </Popover.Button>

            <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                {({close}) => (

                    <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                        <div className="relative bg-white p-4 ">
                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Create checklist?</div>

                            <button onClick={close} className={'absolute top-3 right-2'}>
                                <BsX className={'h-6 w-6'}/>
                            </button>


                            <label htmlFor={"name"} className={'text-xs text-neutral-500 font-semibold mb-4'}>Title</label>
                            <input value={name} autoFocus={true} className={'mt-1 border-1 border-neutral-300 text-md px-2 py-1.5 w-full  rounded-box '} type={"text"} onChange={(e) => {
                                setName(e.target.value)
                                setError(false)
                            }}/>
                            {error && <div className={'text-red-600 text-sm text-sm'}>Please give your list a title</div>}

                            <div className={'flex justify-end_ space-x-2 py-4'}>
                                <button className={'save-btn mt-2'} onClick={e => onCreateList(close)}>Create</button>
                            </div>

                        </div>
                    </div>

                )}
            </Popover.Panel>
        </Popover>
    )
}
