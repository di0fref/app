import {HiCheck} from "react-icons/hi";
import {CardModelButton} from "./CardModal";
import {Popover} from '@headlessui/react'
import {BsCheck2Square, BsX} from "react-icons/bs";
import {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {addCheckList} from "../redux/dataSlice";

export default function ChecklistManager({card}) {

    const [name, setName] = useState("Checklist")
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

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

        <Popover as={"div"} className={"relative"}>
            <Popover.Button onClick={() => {
            }} className={'mb-2'}>
                <CardModelButton className={'w-44'} value={"Checklist"} icon={<BsCheck2Square/>}/>
            </Popover.Button>

            <Popover.Panel static={false}>

                {({close}) => (


                    <div className={'absolute bg-white right-0 rounded-box shadow-lg w-80 p-4'}>
                        <button onClick={close} className={'absolute top-2 right-2'}>
                            <BsX className={'h-6 w-6'}/>
                        </button>
                        <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>
                            Create checklist
                        </div>
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

                )}

            </Popover.Panel>

        </Popover>


    )
}
