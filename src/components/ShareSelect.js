import {Listbox} from "@headlessui/react";
import {HiChevronDown} from "react-icons/hi";
import {useState} from "react";

export default function ShareSelect({user, locked, removeUser}){

    const [selected, setSelected] = useState(user.ProjectUsers[0].role)

    
    return(
        <Listbox disabled={locked} className={"relative"} as={"div"} value={selected} onChange={setSelected}>
            <Listbox.Button>
                <div className={`${locked?"text-gray-400":"hover:bg-modal-dark"} space-x-2 items-center flex bg-modal px-2 py-1 rounded-box `}>
                    <div className={'text-sm'}>{selected}</div>
                    <div><HiChevronDown/></div>
                </div>
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
                <Listbox.Option as={"div"} value={"delete"}>
                    <button onClick={() => removeUser(user)} className={'hover:bg-modal w-full py-1 px-4 text-left border-t'}>
                        <div>Remove from board</div>
                    </button>
                </Listbox.Option>
            </Listbox.Options>
        </Listbox>
    )
}
