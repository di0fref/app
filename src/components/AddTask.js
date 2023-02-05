import {useRef, useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {addTask} from "../redux/dataSlice";

export default function AddTask({title, addNewCard, ...props}) {

    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const inputReference = useRef()

    const submit = async () => {

        const card = await dispatch(addTask({
            projectId: props.projectId,
            columnId: props.id,
            title: value
        }))

        addNewCard(card.payload, props.id)

    }
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
            submit()
            setValue("")
            setEditing(false)
        }
    }
    return (
        <div className={'w-full'}>
            <div className={'font-semibold text-md'}>{title}</div>
            {!editing
                ? (
                    <div>
                        <button onClick={e => setEditing(true)} className={'rounded text-left text-sm text-neutral-500 px-1 py-1 hover:bg-neutral-200 w-full'}>+ Add card</button>
                    </div>
                )
                : (
                    <div>
                        <textarea
                            onBlur={onBlur}
                            ref={inputReference}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            value={value}
                            className={'mt-1 border-0 text-md px-2 py-1.5 shadow  w-full resize-none rounded focus:ring-0 focus:border-0 '}
                            placeholder={"Enter a title for this card..."}></textarea>
                    </div>
                )}
        </div>
    )
}