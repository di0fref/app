import {Fragment, useEffect, useState} from 'react'
import {Disclosure, Menu, Popover, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {getProject, createProject, getProjects} from "../redux/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BsArrowLeft, BsBell, BsChevronDown, BsFillKanbanFill, BsX} from "react-icons/bs";
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {HiChevronRight, HiOutlineCog, HiOutlineLogout, HiPlus} from "react-icons/hi";
import AddField from "./AddField";
import {useRef} from "react";
import {toast} from "react-toastify";
import {Avatar, GoogleHead} from "./GoogleHead";
import {usePopper} from "react-popper";
import {signOutFireBase} from "../auth/firebase";
import Notifications from "./Notifications";
import SettingsModal from "./SettingsModal";

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
//     {
//     name: 'Team',
//     href: '#',
//     current: false
// },
    // {name: 'Projects', href: '#', current: false},
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {

    const user = useSelector(store => store.data.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const projects = useSelector(state => state.data.projects)
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [settingModalOpen, setSettingModalOpen] = useState(false)

    let [referenceElement, setReferenceElement] = useState()
    let [popperElement, setPopperElement] = useState()
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-start",
        strategy: 'absolute',
    })

    const onClose = () => {

    }

    const onNewProject = () => {
        dispatch(createProject({
            title: name
        })).unwrap().then(response => {
            navigate("/board/" + response.id)
            toast.success('Board "' + response.title + '" created')
            dispatch(getProjects(user.id))
        })
    }

    return (
        <Disclosure as="nav" className="bg-[#2C659B] border-b border-b-[#4E7EAC]">
            {({open}) => (<>
                <div className="mx-auto px-2">
                    <div className="relative flex h-12 items-center justify-between">

                        <div className="flex flex-1 items-center justify-start">
                            <div className="">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={'text-white hover:bg-[#537DA4] hover:text-white px-3 py-2 rounded-md text-sm font-medium'}>
                                            {item.name}
                                        </Link>))}
                                    {/*{user.email}*/}


                                    <div className={'relative'}>
                                        <Menu>
                                            <Menu.Button className={'z-40 text-white hover:bg-[#537DA4] hover:text-white px-3 py-2 rounded-md text-sm font-medium'}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div>Boards</div>
                                                    <ChevronDownIcon
                                                        className="ml-2 -mr-1 h-5 w-5 "
                                                        aria-hidden="true"/>
                                                </div>
                                            </Menu.Button>
                                            <Menu.Items static={false} className="z-40 absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-box bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="px-1 py-1 ">

                                                    {projects.map(project => {
                                                        return (
                                                            <Menu.Item as={"div"} key={project.id}>
                                                                {({close}) => (

                                                                    <Link to={"/board/" + project.id} onClick={close} className={'flex items-center space-x-2 my-1 hover:bg-modal-dark  w-full py-1 px-1'}>
                                                                        <div className={'w-6 h-6 font-bold_ text-md bg-gray-300 rounded-box flex items-center justify-center'}>{project.title.charAt(0)}</div>
                                                                        <div className={'font-bold_ text-md'}>{project.title}</div>
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        )
                                                    })}
                                                </div>
                                            </Menu.Items>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            <div className={'relative'}>
                                <Popover>
                                    <Popover.Button className={'bg-[#537DA4] text-white rounded-box hover:bg-[#5895bb] text-sm px-2 py-1 ml-4'}>
                                        <div className={'flex items-center space-x-2'}>
                                            Create
                                        </div>
                                    </Popover.Button>
                                    <Popover.Panel className="absolute top-8 left-0 z-10 mt-1 w-80">

                                        {(props) => (
                                            <div className="overflow-hidden rounded shadow-lg min-h-[24rem]_ ring-1 ring-black ring-opacity-5 bg-white">
                                                <div className="relative bg-white p-4_ ">
                                                    <div className={'mb-8'}>
                                                        <div className="p-4 hover:bg-modal hover:cursor-pointer">
                                                            <div className={'flex items-center justify-start space-x-2'}>
                                                                <BsFillKanbanFill className={'h-3 w-3 text-neutral-600'}/>
                                                                <p className={'text-sm font-semibold'}>Create board</p>
                                                            </div>
                                                            <p className={'text-sm mt-2'}>A board is made up of cards
                                                                ordered on lists. Use it to manage projects, track
                                                                information, or organize anything.</p>
                                                        </div>
                                                    </div>

                                                    <Disclosure as={"div"} onClose={onClose}>
                                                        <div className={'px-4'}>
                                                            <Disclosure.Button className={'cancel-btn bg-modal hover:bg-modal-dark w-full mb-4'}>
                                                                Create
                                                            </Disclosure.Button>
                                                            <Disclosure.Panel className="h-full absolute z-50 top-0 left-0 bg-white w-80">
                                                                <button onClick={props.close} className={'absolute h-6 w-6 top-3 left-4'}>
                                                                    <BsArrowLeft/>
                                                                </button>
                                                                <div className={'p-4'}>
                                                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>
                                                                        Create board
                                                                    </div>

                                                                    <label htmlFor={"name"} className={'text-xs text-neutral-500 font-semibold mb-4'}>Board
                                                                        title</label>
                                                                    <input autoFocus={true} className={'mt-1 border-1 border-neutral-300 text-md px-2 py-1.5 w-full  rounded-box '} type={"text"} onChange={(e) => setName(e.target.value)}/>

                                                                    <div className={'text-red-600 text-sm'}>{error}</div>

                                                                    <div className={'flex justify-end_ space-x-2 py-4'}>
                                                                        <button className={'save-btn mt-2'} onClick={e => {
                                                                            onNewProject()
                                                                            props.close()
                                                                        }}>Create
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </div>
                                                    </Disclosure>
                                                </div>
                                            </div>
                                        )}
                                    </Popover.Panel>
                                </Popover>
                            </div>
                            <div className={'relative w-full justify-end flex'}>

                                <>
                                    <Notifications/>
                                    <Popover>
                                        <Popover.Button ref={setReferenceElement}>
                                            <Avatar user={user} className={"w-8 h-8 rounded-full"}/>
                                        </Popover.Button>
                                        <Popover.Panel as={"div"}>
                                            <div className={'z-20 bg-white shadow-lg absolute w-44 rounded-box right-0'}>

                                                <button onClick={e => {setSettingModalOpen(true)}} className={'my-1 hover:bg-modal-dark w-full'}>
                                                    <div className={'flex items-center space-x-2 px-2 py-1'}>
                                                        <HiOutlineCog className={'text-neutral-500'}/>
                                                        <div className={'text-sm'}>Settings</div>
                                                    </div>
                                                </button>

                                                <button onClick={e => signOutFireBase()} className={'my-1 hover:bg-modal-dark w-full border-t'}>
                                                    <div className={'flex items-center space-x-2 px-2 py-1'}>
                                                        <HiOutlineLogout className={'text-neutral-500'}/>
                                                        <div className={'text-sm'}>Sign out</div>
                                                    </div>
                                                </button>
                                            </div>
                                        </Popover.Panel>
                                    </Popover>
                                    <SettingsModal open={settingModalOpen} seOpen={setSettingModalOpen}/>
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </Disclosure>)
}
