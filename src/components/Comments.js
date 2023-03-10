import {Avatar} from "./GoogleHead";
import {useDispatch, useSelector} from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import {useState, useRef} from "react";
import {useOnClickOutside} from 'usehooks-ts'
import ReactMarkdown from 'react-markdown'
import TextareaAutosize from "react-textarea-autosize";
import {addComment} from "../redux/dataSlice";
import {format} from "date-fns";

export function AddComment({card}) {

    const [edit, setEdit] = useState(false)
    const currentUser = useSelector(state => state.data.user)
    const clickRef = useRef();
    const [text, setText] = useState("")
    const dispatch = useDispatch();

    const onClickOutside = () => {
        setEdit(false)
    }
    useOnClickOutside(clickRef, onClickOutside);

    const onAddComment = () => {
        dispatch(addComment({
            cardId: card.id,
            text: text
        }))
    }


    if (!edit) {
        return (
            <div className={'flex items-start space-x-2'}>
                <div><Avatar className={'rounded-full h-8 w-8'} user={currentUser}/></div>
                <button onClick={e => setEdit(true)} className={'hover:cursor-pointer bg-white w-full h-9 rounded-box border flex items-center pl-2 text-sm text-neutral-400'}>Write a comment...</button>
            </div>
        )
    }

    return (
        <div ref={clickRef} className={'flex items-start space-x-2'}>
            <div><Avatar className={'rounded-full h-8 w-8'} user={currentUser}/></div>

            <div className={'bg-white shadow min-h-[50px] rounded-box border-1 flex-grow'}>
                <TextareaAutosize onChange={e => setText(e.target.value)} autoFocus={true} className={'border-1 p-2 placeholder:text-neutral-400 placeholder:text-sm border-0 resize-none _bg-gray-200 w-full focus:ring-0 focus:border-0'} placeholder={"Write a comment..."}/>
                <div className={'p-2 flex items-center space-x-2'}>
                    <button onClick={onAddComment} className={'save-btn'}>Save</button>
                </div>
            </div>
        </div>

    )
}

export function Comments({card}) {
    const [value, setValue] = useState("");
    const currentUser = useSelector(state => state.data.user)

    return (
        <>
            {card.comments.map(comment => (
                <div className={'flex items-start mt-4 space-x-2'}>
                    <div><Avatar className={'rounded-full h-8 w-8'} user={currentUser}/></div>
                    <div className={'w-full'}>
                        <div className={'font-semibold text-sm mb-2'}>{comment.user.name}
                            <span className={'text-xs text-neutral-500'}> {format(new Date(comment.createdAt), "Y-MM-dd H:ii")}</span>
                        </div>
                        <div className={'bg-white text-md p-2 rounded-box shadow border'}>
                    <MDEditor.Markdown placeholder={""} className={' !bg-transparent !prose !text-md '} source={comment.text}/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
