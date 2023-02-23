import {useEffect, useRef, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import {updateTask} from "../redux/dataSlice";

export default function ChecklistItem({item, edit, setEdit}) {

    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const [value, setValue] = useState(item.name || "");

    useEffect(() => {
        if (edit) {
            setEditing(edit)
        }
    }, [edit])

    const saveText = () => {

        setEditing(false)
        setEdit(false)
    }

    return (
        <div className={'flex items-center space-x-6 space-y-2 relative '}>

            <input type={"checkbox"} className={'absolute -left-2 top-3'}/>

            {editing ? (
                    <div className={'w-full'}>
                        <MDEditor
                            height={0}
                            autoFocus={true}
                            enableScroll={false}
                            hideToolbar={true}
                            preview={"edit"}
                            value={value}
                            onChange={setValue}
                            placeholder={""}
                        />
                        <div className={'flex space-x-2 items-center mt-2'}>
                            <button onClick={saveText} className={'save-btn'}>Save</button>
                            <button onClick={e => {
                                setEditing(false)
                                setEdit(false)
                            }} className={'cancel-btn'}>Cancel
                            </button>
                        </div>
                    </div>
                ) :
                <div onClick={() => setEditing(true)}>
                    <MDEditor.Markdown placeholder={"Add a detailed description"} className={'!bg-transparent !prose !text-md'} source={value}/>
                </div>}
        </div>
    )


    // if (editing) {
    //
    //     return (
    //         <div>
    //             <MDEditor
    //                 height={0}
    //                 autoFocus={true}
    //                 enableScroll={false}
    //                 hideToolbar={true}
    //                 preview={"edit"}
    //                 value={value}
    //                 onChange={setValue}
    //                 placeholder={"Add a detailed description"}
    //             />
    //
    //             <div className={'flex space-x-2 items-center mt-2'}>
    //                 <button onClick={saveText} className={'save-btn'}>Save</button>
    //                 <button onClick={e => {
    //                     setEditing(false)
    //                     setEdit(false)
    //                 }} className={'cancel-btn'}>Cancel
    //                 </button>
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div onClick={() => setEditing(true)}>
    //             <div className={'flex items-center space-x-4 hover:bg-modal-dark px-2 py-1'}>
    //                 <input type={"checkbox"}/>
    //                 <MDEditor.Markdown placeholder={"Add a detailed description"} className={'!bg-transparent !prose !text-md'} source={value}/>
    //             </div>
    //         </div>
    //     )
    // }

}
