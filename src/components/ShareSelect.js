import {Listbox} from "@headlessui/react";
import {HiChevronDown} from "react-icons/hi";
import {useState} from "react";

export default function ShareSelect({user, locked, removeUser, initialSelected, returnSelected}) {

    const [selected, setSelected] = useState(initialSelected)


    const onChange = (value) => {
        setSelected(value)
        returnSelected && returnSelected(value)
    }

    return (
        <Listbox disabled={locked} className={"relative"} as={"div"} value={selected} onChange={value => onChange(value)}>

            <Listbox.Button className={`${locked ? "text-gray-400" : "hover:bg-modal-dark"} space-x-1_ items-center justify-between flex bg-modal px-2 py-2 rounded-box w-24`}>
                <div className={'text-sm'}>{selected}</div>
                <HiChevronDown/>
            </Listbox.Button>

            <Listbox.Options className={"text-md z-20 bg-white  shadow-all _shadow-lg mt-2 absolute right-0 w-52 p-2_"}>

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

            </Listbox.Options>
        </Listbox>
    )
}
