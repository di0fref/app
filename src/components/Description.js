import {useEffect, useRef, useState} from "react";
import MDEditor from '@uiw/react-md-editor';
import {updateTask} from "../redux/dataSlice";
import {useDispatch, useSelector} from "react-redux";

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
                <MDEditor
                    hideToolbar={true}
                    preview={"edit"}
                    value={value}
                    onChange={setValue}
                    textareaProps={{
                        placeholder: "Add a detailed description"
                    }}
                />

                <div className={'flex space-x-2 items-center mt-2'}>
                    <button onClick={saveText} className={'save-btn'}>Save</button>
                    <button onClick={e => {
                        setEditing(false)
                        setEdit(false)
                    }} className={'cancel-btn'}>Cancel</button>
                </div>
            </>
        )
    } else {
        if (card.text) {
            return (
                <div>
                    <MDEditor.Markdown placeholder={"Add a detailed description"} className={' !bg-transparent !prose !text-md '} source={value}/>
                </div>
            )
        } else {
            return (
                <div onClick={e => setEdit(true)} className={'hover:cursor-pointer bg-modal-dark w-full h-16 py-1 px-2 rounded-sm text-sm text-neutral-500 hover:bg-modal-darker'}>Add a detailed description</div>
            )
        }
    }

}
