import {CardModelButton} from "./CardModal";
import {BsArrowLeft, BsToggleOn, BsX} from "react-icons/bs";
import {Disclosure, Popover, Transition} from "@headlessui/react";
import AddLabel from "./AddLabel";
import AddField from "./AddField";
import {useDispatch, useSelector} from "react-redux";

export default function CustomField() {

    const project = useSelector(state => state.data.project)
    const fields = useSelector(state => state.data.project.fields)
    const onClick = () => {

    }

    const setModalOpen = () => {

    }

    const onClose = () => {

    }
    return (
        <div>

            <Popover>
                <Popover.Button>

                    <CardModelButton className={'ml-0.5 md:ml-0 w-40'} onClick={onClick} value={"Custom fields"} icon={
                        <BsToggleOn/>}/>
                </Popover.Button>
                <Popover.Panel  className="absolute top-4 right-4 z-10 mt-1 w-screen w-80 ">

                    {({close}) => (
                        <div className="overflow-hidden rounded shadow-lg min-h-[24rem] ring-1 ring-black ring-opacity-5 bg-white">
                            <div className="relative bg-white p-4 ">
                                <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center'}>Custom fields</div>
                                <button onClick={close} className={'absolute top-2 right-2'}>
                                    <BsX className={'h-6 w-6'}/>
                                </button>

                                {/*{labels.map((label) => (*/}
                                {/*    <div className={'flex items-center space-x-4 mb-4'}>*/}
                                {/*        <div>*/}
                                {/*            <input checked={currentCard?.labels.find(lab => lab.id === label.id) ? 1 : 0} onChange={e => onCheck(e, label)} type={"checkbox"}/>*/}
                                {/*        </div>*/}
                                {/*        <div className={'flex items-center space-x-2'}>*/}
                                {/*            <div style={{backgroundColor: label.color}} className={`w-60 px-2 py-1 flex items-center space-x-2 rounded`}>*/}
                                {/*                <div style={{*/}
                                {/*                    backgroundColor: label.color*/}
                                {/*                }} className={'h-3 w-3 rounded-full brightness-90'}/>*/}
                                {/*                <div className={'text-md'}>{label.title}</div>*/}
                                {/*            </div>*/}
                                {/*            <div><BsPencil className={'text-neutral-500 h-3 w-3'}/></div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*))}*/}


                                <Disclosure as={"div"} onClose={onClose}>
                                    {({close}) => (
                                        <>
                                            <Disclosure.Button onClick={() => setModalOpen(true)} className={'cancel-btn bg-modal hover:bg-modal-dark w-full'}>
                                                Create new field
                                            </Disclosure.Button>
                                            <Transition
                                                className={'absolute top-0 left-0 w-full h-full'}
                                                enter="transition ease duration-300 transform"
                                                enterFrom="opacity-100 -translate-x-80"
                                                enterTo="opacity-100 translate-x-0"
                                                leave="transition ease duration-300 transform"
                                                leaveFrom="opacity-100 translate-x-0"
                                                leaveTo="opacity-100 -translate-x-80">
                                                <Disclosure.Panel className="h-full absolute z-50 top-0 left-0 bg-white">
                                                    <button onClick={close} className={'absolute h-6 w-6 top-2 left-2'}>
                                                        <BsArrowLeft/>
                                                    </button>
                                                    <AddField close={close}/>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    )}
                </Popover.Panel>
            </Popover>
        </div>

    )
}