import {formatDate} from "../helper";
import axios from "axios";
import fileDownload from "js-file-download"

export default function Attachment({file}) {
    const downLoad = () => {
        axios.get("cards/file/download/" + file.id, {
            responseType: 'blob',
        }).then(response => {
             fileDownload(response.data, file.filename);
        })
    }
    return (
        <div className={'hover:bg-modal-darker group mb-2 hover:cursor-pointer'} onClick={downLoad}>
            <div className={'flex items-center space-x-4'}>
                <div className={'rounded text-sm font-bold group-hover:bg-modal-darker bg-modal-dark h-20 w-20 flex items-center justify-center'}>{file.filename.split(".").pop()}</div>
                <div>
                    <div className={'text-sm font-semibold'}>{file.filename}</div>
                    <div className={'text-xs'}>Added {formatDate(file.createdAt)}</div>
                </div>
            </div>
            <div></div>
        </div>
    )
}
