import {Listbox} from "@headlessui/react";
import {HiChevronDown} from "react-icons/hi";
import {useState} from "react";
import {usePopper} from 'react-popper'

export default function ShareSelect({user, locked, removeUser, initialSelected, returnSelected}) {

    const [selected, setSelected] = useState(initialSelected)

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end",
        strategy: 'absolute',
    })

    const onChange = (value) => {
        setSelected(value)
        returnSelected && returnSelected(value)
    }

    return (
        <Listbox disabled={locked} className={"relative"} as={"div"} value={selected} onChange={value => onChange(value)}>

            <Listbox.Button ref={setReferenceElement} className={`${locked ? "text-gray-400" : "hover:bg-modal-dark"} space-x-1_ items-center justify-between flex bg-modal px-2 py-2 rounded-box w-24`}>
                <div className={'text-sm'}>{selected}</div>
                <HiChevronDown/>
            </Listbox.Button>

            <Listbox.Options ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
                <div className={"text-sm z-20 bg-white  py-2 shadow-all mt-2 w-52"}>
                    <Listbox.Option as={"div"} value={"Member"}>
                        <button className={'hover:bg-modal w-full py-1 px-4 text-left'}>
                            <div>Member</div>
                        </button>
                    </Listbox.Option>

                    <Listbox.Option as={"div"} value={"Admin"}>
                        <button className={'hover:bg-modal w-full py-1 px-4 text-left'}>
                            <div>Admin</div>
                        </button>
                    </Listbox.Option>


                    {user &&
                        <Listbox.Option as={"div"} value={"delete"}>
                            <button onClick={() => removeUser(user)} className={'hover:bg-modal w-full py-1 px-4 text-left border-t'}>
                                <div>Remove from board</div>
                            </button>
                        </Listbox.Option>
                    }
                </div>
            </Listbox.Options>

        </Listbox>

    )
}
