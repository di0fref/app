import {Popover} from "@headlessui/react";
import {CardModelButton, CardModelButtonRed} from "./CardModal";
import {BsX} from "react-icons/bs";
import {useState, forwardRef, useImperativeHandle} from "react";
import {usePopper} from "react-popper";

export function Pop(props){

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-start",
        strategy: 'absolute',
    })

    return (
        <Popover as={"div"}>
            <Popover.Button ref={setReferenceElement}>
                {props.button}
            </Popover.Button>

            <Popover.Panel as={"div"} className={"w-80"} ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                {({close, open}) => (
                    <div className="overflow-hidden rounded shadow-all ring-1 ring-black ring-opacity-5 bg-white">
                        <div className="relative bg-white p-4 ">
                            <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>{props.title}</div>
                            <button onClick={close} className={'absolute top-3 right-2'}>
                                <BsX className={'h-6 w-6'}/>
                            </button>
                            {props.children}
                        </div>
                    </div>
                )}
            </Popover.Panel>

        </Popover>
    )
}
