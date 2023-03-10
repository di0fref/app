import {useSelector} from "react-redux";
import {Dialog} from "@headlessui/react";
import {BsX} from "react-icons/bs";
import {useEffect, useState} from "react";

export default function SettingsModal({open, seOpen}) {

    const user = useSelector(state => state.data.user)
    const [isOpen, setIsOpen] = useState(open)

    useEffect(() => {
        setIsOpen(open)
        console.log(open);

    }, [open])

    const onClose = () => {
        setIsOpen(false)
        seOpen(false)
    }

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="fixed inset-0 overflow-auto bg-black/50" aria-hidden="true"/>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex items-center justify-center p-4">

                    <Dialog.Panel className="md:max-w-[600px] w-11/12 transform rounded-sm bg-modal text-left align-middle shadow-xl transition-all">

                        <button onClick={onClose} className={'absolute top-2 right-2'}>
                            <BsX className={'h-6 w-6'}/>
                        </button>
                        <div className={'min-h-[50vh] pl-12 pr-4 py-3'}>

                            <div className={'font-bold flex items-center justify-center'}>Settings</div>

                            Background:
                            

                        </div>


                    </Dialog.Panel>
                </div>
            </div>

        </Dialog>
    )
}
