import {formatDate} from "../helper";
import axios from "axios";
import fileDownload from "js-file-download"
import {BsPaperclip, BsX} from "react-icons/bs";
import {useState} from "react"
import {Popover} from "@headlessui/react";
import {CardModelButtonRed} from "./CardModal";
import {usePopper} from 'react-popper'
import {useDispatch} from "react-redux";
import {getUpdatedCard, deleteFile} from "../redux/dataSlice";

function Attachment({file}) {

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-start",
        strategy: 'absolute',
    })
    const dispatch = useDispatch();

    const downLoad = () => {
        axios.get("cards/file/download/" + file.id, {
            responseType: 'blob',
        }).then(response => {
            fileDownload(response.data, file.filename);
        })
    }

    const deleteAttachment = () => {
        console.log(file.id, file.cardId);
        dispatch(deleteFile(file.id)).then(res => {
            dispatch(getUpdatedCard(file.cardId))
        })
    }

    return (
        <div className={'hover:bg-modal-darker group mb-2 hover:cursor-pointer'}>
            <div className={'flex items-center space-x-4'}>
                <div className={'rounded text-sm font-bold group-hover:bg-modal-darker bg-modal-dark h-20 w-20 flex items-center justify-center'}>{file.filename.split(".").pop()}</div>
                <div>
                    <div className={'text-sm font-semibold'}>{file.filename}</div>
                    <div className={'text-xs flex items-center space-x-2'}>
                        <div>Added {formatDate(file.createdAt)}</div>
                        <Popover as={"div"}>
                            <Popover.Button ref={setReferenceElement} className={'underline'}>Delete</Popover.Button>
                            <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                                {({close}) => (

                                    <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                                        <div className="relative bg-white p-4 ">
                                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Delete attachment?</div>

                                            <button onClick={close} className={'absolute top-3 right-2'}>
                                                <BsX className={'h-6 w-6'}/>
                                            </button>

                                            <div>
                                                <div className={'text-sm p-1'}>Deleting an attachment is permanent and there is no way to get it back.
                                                </div>
                                                <div className={'mt-2 text-center'}>
                                                    <CardModelButtonRed onClick={deleteAttachment} className={'text-center'} value={"Delete"}/>
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
        </div>
    )
}


export default function Attachments({card}) {
    const [itemsToShow, setItemsToShow] = useState(3);
    const showmore = () => {
        setItemsToShow(card.files.length)
    }

    const showless = () => {
        setItemsToShow(3)
    }

    if (card.files.length) {
        return (
            <div className={'my-4'}>
                <BsPaperclip className={'absolute left-6 h-5 w-5'}/>
                <div className={'font-semibold text-base mt-8 mb-4'}>Attachments</div>

                {card.files.slice(0, itemsToShow).map((file, index) => (
                    <Attachment card={card} key={file.id} file={file}/>
                ))}

                {card.files.length > 3 && (
                    (itemsToShow === 3)
                        ?
                        <button className={'text-sm text-blue-600 underline hover:text-neutral-700'} onClick={showmore}>Show More</button>
                        :
                        <button className={'text-sm text-blue-600 underline hover:text-neutral-700'} onClick={showless}>Show Less</button>
                )}
            </div>
        )
    } else {
        return null
    }

}
