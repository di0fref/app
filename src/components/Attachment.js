import {formatDate} from "../helper";

export default function Attachment({file}) {
    return (
        <div className={'hover:bg-modal-darker group mb-2 hover:cursor-pointer'}>
            <div className={'flex items-center space-x-4'}>
                <div className={'rounded text-sm font-bold group-hover:bg-modal-darker bg-modal-dark h-20 w-20 flex items-center justify-center'}>{file.filename.split(".").pop()}</div>
                <div>
                    <div className={'text-sm font-semibold'}>{file.filename}</div>
                    <div className={'text-sm'}>Added {formatDate(file.createdAt)}</div>
                </div>
            </div>
            <div></div>
        </div>
    )
}
