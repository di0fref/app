import {useEffect, useRef, useState} from "react";
import MDEditor from "@uiw/react-md-editor";
import {addChecklistItem, deleteCheckListItem, updateChecklistItem, updateTask} from "../redux/dataSlice";
import {useDispatch} from "react-redux";
import {socket} from "../redux/store";
import {useOnClickOutside} from 'usehooks-ts'
import {BsThreeDots, BsThreeDotsVertical, BsTrash} from "react-icons/bs";
import {Menu} from "@headlessui/react";

export default function ChecklistItem({item, edit, setEdit, card, isNew, list}) {

    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const [value, setValue] = useState(item.name || "");
    const [done, setDone] = useState(item.done ? true : false);
    const dispatch = useDispatch()

    const clickRef = useRef();

    const onClickOutside = () => {
        setEditing(false)
        setEdit(false)
    }
    useOnClickOutside(clickRef, onClickOutside);

    useEffect(() => {
        if (edit) {
            setEditing(edit)
        }
    }, [edit])

    const saveText = () => {
        if(value !== "") {
            if (isNew) {
                dispatch(addChecklistItem({
                    checklistId: list.id,
                    name: value
                }))
            } else {
                dispatch(updateChecklistItem({
                    id: item.id,
                    name: value
                }))
            }
            setEdit(false)
            setEditing(false)
            socket.emit("card update", {
                id: card.id,
                room: card.projectId
            })
        }
    }

    const deleteItem = () => {
        dispatch(deleteCheckListItem(item.id))
    }

    const updateStatus = (e) => {
        setDone(e.target.checked)
        dispatch(updateChecklistItem({
            id: item.id,
            done: e.target.checked ? 1 : 0
        })).then(r => {
            socket.emit("card update", {
                id: card.id,
                room: card.projectId
            })
        })
    }

    return (

        <div className={'rounded-box relative hover:bg-modal-dark hover:cursor-pointer group'}>
            <input onChange={updateStatus} checked={done} type={"checkbox"} className={'absolute -left-6 top-2.5'}/>

            {editing ? (

                    <div ref={clickRef} className={'w-full p-2 bg-blue-300_'}>
                        <MDEditor
                            style={{
                                minHeight: "50px"
                            }}
                            height={0}
                            autoFocus={true}
                            enableScroll={false}
                            hideToolbar={true}
                            preview={"edit"}
                            value={value}
                            onChange={setValue}
                            placeholder={"Add text"}
                            visibleDragbar={false}
                            textareaProps={{
                                placeholder: "Add an item",
                            }}
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
                (
                    <>
                        <div className={'p-2 w-full bg-blue-300_'} onClick={() => setEditing(true)}>
                            <MDEditor.Markdown placeholder={"Add a description"} className={'pr-6 !bg-transparent !prose !text-md'} source={value}/>
                        </div>

                        <div className={'absolute right-2 z-20_ top-2 '}>
                            <Menu>
                                <Menu.Button className={"z-20"}>
                                    <div className={'z-20 group-hover:visible invisible h-6 w-6 hover:bg-modal-darker flex items-center justify-center rounded-box'}>
                                        <BsThreeDots/>
                                    </div>
                                </Menu.Button>
                                <Menu.Items as={"div"} static={false}>
                                    <div className={'absolute bg-white py-1 shadow-lg rounded z-50 w-44'}>
                                        <Menu.Item onClick={deleteItem} className={'py-1 px-2 hover:bg-modal z-50 text-sm flex items-center space-x-2'} as={"div"}>
                                            <div><BsTrash className={'text-neutral-500'}/></div>
                                            <div>Delete item</div>
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Menu>
                        </div>
                    </>
                )
            }
        </div>

    )
}
