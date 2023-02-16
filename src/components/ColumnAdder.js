import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {addColumn} from "../redux/dataSlice";

export default function ColumnAdder({project}) {
    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const inputReference = useRef()

    useEffect(() => {
        if (editing) {
            inputReference.current.focus()
        }
    }, [editing])

    const onBlur = () => {
        setEditing(false)
    }
    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            setValue("")
            setEditing(false)

            dispatch(addColumn({
                projectId: project.id,
                title: e.target.value
            }))
        }
    }

    return (
        <div className={'rounded-box'}>
            {!editing
                ? (

                    <div onClick={e => setEditing(true)} className={'hover:cursor-pointer text-white shadow-2xl flex items-center justify-center rounded-box  bg-[#5e89b1] h-11 w-64'}>
                        <div className={'text-sm'}>+ Add another list</div>
                    </div>
                )
                : (
                    <div className={'bg-modal px-3 pt-2 pb-4 rounded-box'}>
                        <input
                            type={"text"}
                            onBlur={onBlur}
                            ref={inputReference}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            value={value}
                            className={'mt-1 border-0 text-md px-2 py-1.5 shadow  w-64 resize-none rounded-sm  '}
                            placeholder={"Enter list title..."}/>
                    </div>
                )}
        </div>


    )
}
