import {useEffect, useRef, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import {updateTask} from "../redux/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import ReactMarkdown from 'react-markdown'
import {Mention, MentionsInput} from "react-mentions";
import defaultStyle from "../service/defaultStyle";
import defaultMentionStyle from "../service/defaultStyle";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from 'remark-gfm'

export default function Description({card, edit, setEdit}) {

    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const [value, setValue] = useState(card.text || "");

    const dispatch = useDispatch();

    useEffect(() => {
        if (edit) {
            setEditing(edit)
        }
    }, [edit])

    const saveText = () => {
        dispatch(updateTask({
            id: card.id,
            text: value
        })).unwrap()
        setEditing(false)
        setEdit(false)
    }
    if (editing) {

        return (

            <>
                {/*<div className={'bg-white p-4 border'}>*/}
                    <TextareaAutosize placeholder={"Add a detailed description"} autoFocus={true} className={'resize-none min-h-[8rem] text-md border-0 w-full border rounded-sm'} value={value} onChange={e => setValue(e.target.value)}/>
                {/*</div>*/}


                <div className={'flex space-x-2 items-center'}>
                    <button onClick={saveText} className={'save-btn'}>Save</button>
                    <button onClick={e => {
                        setEditing(false)
                        setEdit(false)
                    }} className={'cancel-btn'}>Cancel
                    </button>
                </div>
            </>
        )
    } else {
        if (card.text) {
            return (
                <div onClick={e => setEdit(true)}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} placeholder={"Add a detailed description"} className={' prose text-md'} children={value}/>
                </div>
            )
        } else {
            return (
                <div onClick={e => setEdit(true)} className={'mt-2 hover:cursor-pointer bg-modal-dark w-full h-16 py-1 px-2 rounded-sm text-sm text-neutral-500 hover:bg-modal-darker'}>Add a detailed description</div>
            )
        }
    }

}
