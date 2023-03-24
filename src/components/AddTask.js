import {useRef, useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {addTask} from "../redux/dataSlice";
import {BsThreeDotsVertical, BsX} from "react-icons/bs";
import ColumnMenu from "./ColumnMenu";
import {socket} from "../redux/store";
import TextareaAutosize from "react-textarea-autosize";
import {Popover} from "@headlessui/react";

export default function AddTask({column, project, addCard}) {

    const [value, setValue] = useState("")
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(false)
    const inputReference = useRef()
    const [multiple, setMultiple] = useState(false)
    const [lineCount, setLineCount] = useState(0)

    function splitLines(text) {
        return text.split('\n')
    }

    const buttonSubmit = () => {
        const lines = splitLines(value)
        setLineCount(lines.length)
        if (lines.length > 1) {
            setMultiple(true)

        } else {
            submit()
        }
    }

    const createMultiple = () => {
        const lines = splitLines(value)

        lines.map(line => {
            dispatch(addTask({
                projectId: project.id,
                columnId: column.id,
                title: line
            })).unwrap().then(response => {
                
                addCard(response)
                
                socket.emit("card new", {
                    id: response.id,
                    room: response.projectId
                })
            })
        })
        setValue("")
        setEditing(false)
    }

    const submit = (button) => {

        const card = dispatch(addTask({
            projectId: project.id,
            columnId: column.id,
            title: value.replaceAll('\n', ' ')
        })).unwrap().then(response => {

            socket.emit("card new", {
                id: response.id,
                room: response.projectId
            })

            addCard(response)
            setValue("")
            setEditing(false)
        })
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
        }
    }
    return (
        <div className={'w-full px-2 pt-2'}>

            <div className={'flex items-center justify-between'}>
                <div className={'font-semibold text-md'}>{column?.title}</div>
                <div><ColumnMenu column={column}/></div>
            </div>

            {!editing
                ? (
                    <div>
                        <button onClick={e => setEditing(true)} className={'rounded-box text-left text-sm text-neutral-500 px-2 py-1.5 hover:bg-neutral-200 w-full'}>+
                            Add card
                        </button>
                    </div>
                )
                : (
                    <div>
                        <TextareaAutosize
                            // onBlur={onBlur}
                            minRows={3}
                            ref={inputReference}
                            onChange={e => setValue(e.target.value)}
                            onKeyDown={onKeyDown}
                            value={value}
                            className={'mt-1 border-0 text-md px-2 py-1.5 shadow w-full resize-none rounded-box focus:ring-0 focus:border-0 '}
                            placeholder={"Enter a title for this card..."}/>

                        {/*<button onClick={e => submit()} className={'save-btn'}>Add card</button>*/}
                        {/*<button className={'cancel-btn ml-2'}>Cancel</button>*/}
                        <Popover>
                            {({close, open}) => (
                                <>
                                    <Popover.Button onClick={buttonSubmit}>
                                        <div className={'save-btn'}>Add card</div>
                                    </Popover.Button>

                                    <button onClick={() => setEditing(false)} className={'cancel-btn ml-2'}>Cancel</button>

                                    {multiple &&
                                        <Popover.Panel className={'absolute bg-white shadow-all z-50 w-72 text-sm p-4 rounded-box'}>

                                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Create card</div>
                                            <button onClick={close} className={'absolute top-2 right-2'}>
                                                <BsX className={'h-6 w-6'}/>
                                            </button>
                                            <div className={'mb-2'}>If you want, we can create a card for every new line ({lineCount}). You can also create one card with a long title.</div>
                                            <button onClick={createMultiple} className={'bg-modal-dark py-1 w-full my-2'}>Create {lineCount} cards</button>
                                            <button onClick={submit} className={'bg-modal-dark py-1 w-full'}>Just one card</button>


                                        </Popover.Panel>
                                    }
                                </>
                            )}
                        </Popover>

                    </div>
                )}
        </div>
    )
}
