import {Dialog} from "@headlessui/react";
import {BsFilter, BsX} from "react-icons/bs";
import {HiChevronDown, HiUser} from "react-icons/hi";
import {useState, useEffect} from "react";
import axios from "axios";
import {Avatar} from "./GoogleHead";
import {Menu, Listbox} from "@headlessui/react";
import ShareSelect from "./ShareSelect";
import {useSelector} from "react-redux";
import validator from "validator";


export default function Members({project}) {

    const [open, setOpen] = useState(false)
    const [users, setUsers] = useState([])
    const currentUser = useSelector(state => state.data.user)
    const [newUserEmail, setNewUserEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [selected, setSelected] = useState("")

    console.log(users.pending);
    const fetchData = async () => {
        const response = await axios.get("/users/" + project.id)
        setUsers(response.data)
    }

    useEffect(() => {
        open && fetchData().catch(console.error)
    }, [open])

    const validateEmail = (email) => {
        if (!validator.isEmail(email)) {
            setEmailError("Please enter valid Email.")
            return false
        } else {
            setEmailError('')
            return true
        }
    }

    const addUser = () => {
        if (!validateEmail(newUserEmail)) {
            return
        }

        const data = {
            email: newUserEmail,
            role: selected,
            projectId: project.id,
            role: "Member"
        }
        axios.post("/users/addPendingUser", data).then(res => {
            fetchData().catch(console.error)
        })
    }

    const removeUser = (user) => {
        axios.post("/users/removeUserFromProject", {
            userId: user.id,
            projectId: project.id
        }).then(res => {
            fetchData().catch(console.error)
        })
    }

    return (

        <>
            <button onClick={e => setOpen(true)} className={'bg-modal hover:bg-modal-dark rounded-box text-sm flex py-1 px-2 items-center space-x-2'}>
                <HiUser/>
                <div>Share</div>
            </button>

            <Dialog
                open={open} onClose={() => setOpen(false)} className="relative z-50">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex items-center justify-center p-4 h-[80vh]">
                    {/* The actual dialog panel  */}
                    <Dialog.Panel className="max-w-lg w-11/12 transform rounded-sm bg-white text-left align-middle shadow-xl transition-all">

                        <Dialog.Title className={"pt-4 px-6 fo nt-semibold text-xl"}>Share board</Dialog.Title>
                        <button onClick={() => setOpen(false)} className={'absolute top-4 right-4'}>
                            <BsX className={'w-7 h-7'}/></button>

                        <div className={'min-h-[300px] max-h-[600px] overflow-auto px-6 py-4'}>

                            <div className={'h-full bg-red-300_'}>
                                <div className={'flex items-center justify-between space-x-2'}>
                                    <input onChange={e => {
                                        setNewUserEmail(e.target.value)
                                        setEmailError("")
                                    }} type={"text"} className={'mt-1_ border-1 border-neutral-300 text-md h-9 py-1 px-2 w-full rounded-box'}/>

                                    <ShareSelect returnSelected={setSelected} initialSelected={"Member"} locked={false}/>

                                    <button onClick={addUser} className={'save-btn h-8'}>Share</button>
                                </div>
                                {emailError && <div className={'text-red-600 text-sm'}>{emailError}</div>}
                            </div>
                            <div className={'font-semibold text-sm mt-4 mb-2'}>Members</div>
                            <div>
                                {users.users && users?.users.map(user => (
                                    <div key={user.id} className={'flex items-center space-x-4 mb-4 '}>
                                        <Avatar className={"bg-neutral-200 rounded-full w-8 h-8"} key={user.id} user={user}/>
                                        <div className={'flex flex-col flex-grow'}>
                                            <div className={'text-md _font-semibold'}>{user.name} {user.id === currentUser.id ?
                                                <span className={'text-sm'}>(you)</span> : ""} </div>
                                            <div className={'text-subtle text-xs'}>{user.email}</div>
                                        </div>
                                        <div>
                                            <ShareSelect removeUser={removeUser} user={user} initialSelected={user.ProjectUsers[0].role} locked={user.id === currentUser.id}/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={'font-semibold text-sm mt-4 mb-2'}>Pending</div>
                            <div>
                                {users.pending && users?.pending.map(user => (
                                    <div key={user.id} className={'flex items-center space-x-4 mb-4 '}>
                                        <Avatar className={"bg-neutral-200 rounded-full w-8 h-8"} key={user.id}/>
                                        <div className={'flex flex-col flex-grow'}>
                                            <div className={'text-md _font-semibold'}>{user.email}</div>
                                            {/*<div className={'text-subtle text-xs'}>{user.email}</div>*/}
                                        </div>
                                        <div>
                                            <ShareSelect removeUser={removeUser} user={user} initialSelected={user.role} locked={false}/>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>

                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}
