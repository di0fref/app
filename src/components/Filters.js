import {Popover} from "@headlessui/react";
import {BsClock, BsFilter, BsX} from "react-icons/bs";
import {FiClock} from "react-icons/fi";
import {useLocalStorage} from "usehooks-ts"

export default function Filters() {

    const [filters, setFilters] = useLocalStorage("filters", {
        "tomorrow": false,
        "today": false,
        "overdue": false,
        "labels": []
    })
    const setFilter = (e, type) => {
        const data = {
            ...filters,
            [type]: e.target.checked
        }
        setFilters(data)

    }
    return (
        <div className={'relative'}>

            <Popover>
                {({open, close}) => (
                    <>
                        <Popover.Button as={"div"} className={`${open ? "bg-modal" : "bg-[#3E7EA6] text-neutral-200"} hover:cursor-pointer ring-0  border-0 !active:border-0 !active:border-0 !focus:ring-0 !focus:border-0  py-1 px-2 rounded-box`}>
                            <div className={`flex items-center space-x-2 text-sm`}>
                                <div><BsFilter/></div>
                                <div>Filters</div>
                            </div>
                        </Popover.Button>

                        <Popover.Panel static={true} className="absolute left-0 z-10 mt-3 w-80 _px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                                <div className="relative bg-white p-4 ">
                                    <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>
                                        Filters
                                    </div>
                                    <button onClick={close} className={'absolute top-2 right-2'}>
                                        <BsX className={'h-6 w-6'}/>
                                    </button>

                                    <div className={'text-md'}>
                                        <div className={'text-sm text-neutral-500 font-semibold mb-2'}>Due date</div>
                                        <div className={'mb-2'}>
                                            <div className={'flex items-center space-x-2 mb-2'}>
                                                <input type={"checkbox"} checked={filters["today"]} onChange={(e) => setFilter(e, "today")}/>
                                                <div>Today</div>
                                            </div>


                                            <div className={'flex items-center space-x-2 mb-2'}>
                                                <input checked={filters["tomorrow"]}  type={"checkbox"} onChange={(e) => setFilter(e, "tomorrow")}/>
                                                <div className={'flex items-center justify-start space-x-2'}>
                                                    <FiClock className={'bg-yellow-500 rounded-full text-white '}/>
                                                    <div>Tomorrow</div>
                                                </div>
                                            </div>



                                            <div className={'flex items-center space-x-2 mb-2'}>
                                                <input type={"checkbox"} checked={filters["overdue"]} onChange={(e) => setFilter(e, "overdue")}/>
                                                <div className={'flex items-center justify-start space-x-2'}>
                                                    <FiClock className={'bg-red-600 rounded-full text-white'}/>
                                                    <div>Overdue</div>
                                                </div>
                                            </div>
                                            <div className={'text-sm text-neutral-500 font-semibold mt-3 mb-2 '}>Labels</div>

                                            <div>
                                                Labels
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </Popover.Panel>
                    </>
                )}
            </Popover>

        </div>
    )
}