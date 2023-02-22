import {Disclosure, Transition} from "@headlessui/react";
import {BsThreeDotsVertical, BsX} from "react-icons/bs";
import {useEffect, useState} from "react";
import axios from "axios";
import Activity from "./Activity";

export default function AuditLog({project}) {

    const [activities, setActivities] = useState([])
    const [open, setOpen] = useState([])

    useEffect(() => {

        const fetchData = async () => {

            const response = await axios.get("/projects/log/" + project.id)
            setActivities(response.data)

        }

        open && fetchData().catch(console.error)

    }, [open])


    return (
        <Disclosure>
            {({open, close}) => (

                <>
                    <Disclosure.Button onClick={e => setOpen(true)} className={"text-neutral-100 bg-[#537DA4] w-8 h-8 flex items-center justify-center rounded-box"}>
                        <BsThreeDotsVertical/>
                    </Disclosure.Button>

                    <Transition
                        enter="transition-opacity duration-75"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Disclosure.Panel static={false} as={"div"} className={"z-40 bg-white _bg-[#f4f5f7] drop-shadow-xl absolute top-0 right-0 w-96"}>

                            <div className="relative bg-[#f4f5f7]_ bg-white ">
                                <div className={'text-neutral-700 font-semibold mb-4 text-center border-b pb-2 p-2'}>
                                    Menu
                                </div>
                                <button onClick={e => {
                                    close()
                                    setOpen(false)
                                }} className={'absolute top-2 right-2'}>
                                    <BsX className={'h-6 w-6'}/>
                                </button>

                                <div className={'h-[calc(100vh-6.7rem)] overflow-auto p-6'}>
                                    <div>Activity</div>

                                    {activities?.map(activity => {
                                        return <Activity key={activity.id} activity={activity}/>
                                    })}
                                </div>
                            </div>

                        </Disclosure.Panel>
                    </Transition>
                </>

            )}
        </Disclosure>
    )
}
