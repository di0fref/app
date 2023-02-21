import {Fragment, useEffect} from 'react'
import {Disclosure, Menu, Popover, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import {getProject} from "../redux/dataSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BsChevronDown, BsFillKanbanFill} from "react-icons/bs";
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import {HiPlus} from "react-icons/hi";

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

    // useEffect(() => {
    //     params.projectId && dispatch(getProject(params.projectId))
    // }, [params.projectId])

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
                                    {user.email}


                                    <div className={'relative'}>
                                        <Menu>
                                            <Menu.Button className={'z-40 text-white hover:bg-[#537DA4] hover:text-white px-3 py-2 rounded-md text-sm font-medium'}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div>Projects</div>
                                                    <ChevronDownIcon
                                                        className="ml-2 -mr-1 h-5 w-5 "
                                                        aria-hidden="true"/>
                                                </div>
                                            </Menu.Button>
                                            <Menu.Items static={false} className="z-40  absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-box bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="px-1 py-1 ">

                                                    {projects.map(project => {
                                                        return (
                                                            <Menu.Item as={"div"} key={project.id}>
                                                                {({close}) => (

                                                                    <Link to={"/project/" + project.id} onClick={close} className={'flex items-center space-x-2 mb-2 hover:bg-modal-dark  w-full py-1 px-1'}>
                                                                        <div className={'w-10 h-10 font-bold text-lg bg-red-300 rounded-box flex items-center justify-center'}>{project.title.charAt(0)}</div>
                                                                        <div className={'font-bold text-md'}>{project.title}</div>
                                                                    </Link>
                                                                )}

                                                            </Menu.Item>
                                                        )
                                                    })}
                                                </div>
                                            </Menu.Items>
                                        </Menu>

                                        <Popover>
                                            <Popover.Button className={'ml-4'}>
                                                <div className={'bg-[#537DA4] text-white rounded-box hover:bg-[#5895bb] text-sm px-2 py-1 '}>
                                                    Create
                                                </div>
                                            </Popover.Button>
                                            <Popover.Panel static={false} className="z-40 absolute left-32 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-box bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="p-4 hover:bg-modal hover:cursor-pointer">
                                                    <div className={'flex items-center justify-start space-x-2'}>
                                                        <BsFillKanbanFill className={'h-3 w-3 text-neutral-600'}/>
                                                        <p className={'text-sm font-semibold'}>Create board</p>
                                                    </div>
                                                    <p className={'text-sm mt-2'}>A board is made up of cards ordered on lists. Use it to manage projects, track information, or organize anything.</p>
                                                </div>
                                            </Popover.Panel>
                                        </Popover>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </>)}
        </Disclosure>)
}
