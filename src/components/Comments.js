import {Avatar} from "./GoogleHead";
import {useDispatch, useSelector} from "react-redux";
import MDEditor from "@uiw/react-md-editor";
import {useState, useRef, useEffect} from "react";
import {useLocalStorage, useOnClickOutside} from 'usehooks-ts'
import TextareaAutosize from "react-textarea-autosize";
import {addComment, deleteComment} from "../redux/dataSlice";
import {formatDate, isGuid} from "../helper";
import {socket} from "../redux/store";
import {Popover} from "@headlessui/react"
import {CardModelButton, CardModelButtonRed} from "./CardModal";
import {BsChatDots, BsX} from "react-icons/bs";
import {usePopper} from "react-popper";
import ReactMarkdown from 'react-markdown'
import defaultStyle from "../service/defaultStyle"
import {Mention, MentionsInput} from "react-mentions";
import defaultMentionStyle from "../service/defaultStyle";
import axios from "axios";
import remarkGfm from 'remark-gfm'

export function AddComment({card}) {

    const [edit, setEdit] = useState(false)
    const currentUser = useSelector(state => state.data.user)
    const clickRef = useRef();
    const [value, setValue] = useLocalStorage("commentDraft" + card.id, "")
    const dispatch = useDispatch();

    const onClickOutside = () => {
        !value && setEdit(false)
    }
    useOnClickOutside(clickRef, onClickOutside);

    const users = useSelector(state => state.data.project.users)

    useEffect(() => {
        if (value) setEdit(true)
    }, [])


    const onAddComment = () => {
        dispatch(addComment({
            cardId: card.id,
            text: value
        })).unwrap().then(response => {
            setEdit(false)
            setValue("")
            localStorage.removeItem("commentDraft" + card.id)
            socket.emit("comment new", {
                room: card.projectId,
                comment: response
            })
        })
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onAdd = (user) => {
        console.log(user)
    }
    const fetchUsers = (query, callback) => {
        if (!query) return;
        // axios.get("/users/" + card.projectId)
        //     .then(res => res.data)
        //     .then(res => res.map(user => {
        //         return {display: user.user.name, id: user.user.id, image: user.user.image, ...user.user}
        //     }))
        //     .then(callback)

        const fetchedUsers = users.map(user => ({display: user.name, id: user.id, image: user.image, ...user}))
        callback(fetchedUsers)
    };

    const renderSuggestion = (user) => {
        return (
            <div className={'flex items-center space-x-2 py-1 px-2 text-md my-1 rounded-box'}>
                <Avatar user={user} className={"h-7 w-7 rounded-full"}/>
                <div>{user.display}</div>
            </div>
        )
    }

    const renderSuggestionContainer = (children) => {
        return (
            // <div className={'bg-white shadow-lg'}>
            //     <div>Mention</div>
            //     <div>{children}</div>
            // </div>
            <div className="overflow-hidden rounded shadow-all w-80 ring-1 ring-black ring-opacity-5 bg-white">
                <div className="relative bg-white p-2 ">
                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Mention?</div>


                    <div>
                        {children}
                    </div>

                </div>
            </div>
        )
    }
    return (
        <div>

            {edit?( <>
                <MentionsInput
                    value={value}
                    allowSuggestionsAboveCursor={true}
                    onChange={onChange}
                    placeholder={"Write a comment"}
                    a11ySuggestionsListLabel={"Suggested mentions"}
                    style={defaultStyle}
                    customSuggestionsContainer={(children) => renderSuggestionContainer(children)}>
                    <Mention
                        markup={"[@__display__](/#__id__)"}
                        appendSpaceOnAdd={true}
                        renderSuggestion={renderSuggestion}
                        displayTransform={(id, display) => (`@${display}`)}
                        trigger={"@"} data={fetchUsers} onAdd={onAdd} style={defaultMentionStyle}/>
                </MentionsInput>
                <button disabled={value === ""} onClick={onAddComment} className={'disabled:opacity-50 save-btn'}>Save</button>
            </>):(
                <div onClick={e => setEdit(true)} className={"w-full bg-white border p-2"}>
                    <ReactMarkdown className={'rounded-box cursor-pointer p-0 m-0 text-neutral-400 text-md'} children={"Write a comment"}/>
                </div>
            )}
        </div>
    )


    // return (
    //     <div className={'flex items-start space-x-4'}>
    //         <Avatar className={'rounded-full h-8 w-8'} user={currentUser}/>
    //
    //         {
    //             !edit ? (
    //                     <div onClick={e => setEdit(true)} className={"w-full bg-white border p-2"}>
    //                         <ReactMarkdown className={'rounded-box cursor-pointer p-0 m-0 text-neutral-400 text-md'} children={"Write a comment"}/>
    //                     </div>
    //                 )
    //
    //                 : (
    //                     <div className={'w-full bg-white rounded-box border p-2'} ref={clickRef}>
    //                         <div>
    //                         <TextareaAutosize value={value} onChange={e => setValue(e.target.value)} autoFocus={true} placeholder={"Write a comment"} className={'placeholder:text-md bg-transparent focus:bottom-0 focus:ring-0 placeholder:text-neutral-400 p-0 m-0 min-h-[50px] resize-none border-none w-full'}/>
    //                         </div>
    //                         <div className={'flex items-center space-x-2'}>
    //                             <button disabled={value === ""} onClick={onAddComment} className={'disabled:opacity-50 save-btn'}>Save</button>
    //                             <button onClick={e => setEdit(false)} className={'cancel-btn'}>Cancel</button>
    //                         </div>
    //                     </div>
    //                 )
    //         }
    //     </div>
    // )

}

export function Comments({comment, card}) {
    const [value, setValue] = useState("");
    const currentUser = useSelector(state => state.data.user)
    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-start",
        strategy: 'absolute',
    })

    const dispatch = useDispatch();

    const onDeleteComment = () => {
        dispatch(deleteComment({
            id: comment.id,
        })).unwrap().then(response => {
            socket.emit("comment delete", {
                room: card.projectId,
                deletedId: response.id,
                card: card
            })
        })
    }
    return (
        <>
            {/*{card.comments.map(comment => (*/}
            <div className={'flex items-start mt-4 space-x-4'}>
                <Avatar className={'rounded-full h-8 w-8'} user={currentUser}/>
                <div className={'w-full'}>
                    <div className={'font-semibold text-sm mb-2'}>{comment.user.name}
                        <span className={'text-xs text-neutral-500'}> {formatDate(comment.createdAt)}</span>
                    </div>
                    <div className={'bg-white text-md p-2 rounded-box shadow_ border'}>
                        {/*<MDEditor.Markdown placeholder={""} className={' !bg-transparent !prose !text-md '} source={comment.text}/>*/}
                        {/*</div>*/}
                        <ReactMarkdown children={comment.text}
                                       className={'!prose !text-md'}
                                       remarkPlugins={[remarkGfm]}
                                       components={{
                                           a: props => {
                                               return (props.href.startsWith("/#")) ? (
                                                   <a className={"atMention"} href={props.href}>{props.children}</a> // Render mention links with custom component
                                               ) : (
                                                   <a href={props.href}>{props.children}</a> // All other links
                                               )
                                           }

                                       }}
                        />
                    </div>
                    <div className={'flex space-x-2 text-xs mt-1'}>
                        <button className={'text-neutral-500 underline'}>Edit</button>
                        <Popover as={"div"}>
                            <Popover.Button ref={setReferenceElement}>
                                <div className={'text-neutral-500 underline'}>Delete</div>
                            </Popover.Button>

                            <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                                {({close}) => (

                                    <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                                        <div className="relative bg-white p-4 ">
                                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Delete comment?</div>


                                            <button onClick={close} className={'absolute top-3 right-2'}>
                                                <BsX className={'h-6 w-6'}/>
                                            </button>


                                            <div>
                                                <div className={'text-sm p-1'}>Deleting a comment is permanent and there is no way to get it back.
                                                </div>
                                                <div className={'mt-2 text-center'}>
                                                    <CardModelButtonRed onClick={onDeleteComment} className={'text-center'} value={"Delete"}/>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                )}
                            </Popover.Panel>
                        </Popover>
                    </div>
                </div>
            </div>
            {/*))}*/}
        </>
    )
}
