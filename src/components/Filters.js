import {Popover} from "@headlessui/react";
import {BsClock, BsFilter, BsX} from "react-icons/bs";
import {FiClock} from "react-icons/fi";
import {useLocalStorage} from "usehooks-ts"
import {useState, useEffect} from "react";
import Label from "./Label";
import {ArrayParam, useQueryParams} from "use-query-params";

export default function Filters({project}) {
    //
    // const [filters, setFilters] = useLocalStorage("filters", {
    //     due: [],
    //     labels: []
    // })

    const [enabledCount, setEnabledCount] = useState(0)
    const [filterParams, setFilterParams] = useQueryParams()

    // useEffect(() => {
    //     let count = 0;
    //     filterParams && filterParams?.due && filterParams.due.map(([key, val], index) => {
    //         count = val ? count = count + 1 : count
    //     })
    //     setEnabledCount(count + filterParams?.labels ? filterParams?.labels : 0)
    //
    //
    // }, [filterParams])

    const setDueFilter = async (e, id) => {

        // const params = filterParams
        if(e.target.checked){
            filterParams.due.push(id)
        }
        else{
            const labelIndex = filterParams.due.findIndex(due => due === id)
            console.log(filterParams.due.splice(labelIndex, 1))
        }

        setFilterParams(filterParams)

    }


    useEffect(() => {

        console.log(filterParams)

    }, [filterParams])


    const setLabelFilter = (e, id) => {

        const labels = filterParams.labels || []
        if(e.target.checked){
            filterParams.labels.push(id)
        }
        else{
            const labelIndex = labels.findIndex(label => label === id)
            labels.splice(labelIndex, 1)
        }

        setFilterParams({
            ...filterParams,
            labels: labels
        })

    }

    const resetFilter = () => {
        setEnabledCount(0)
        setFilterParams({})
    }
    return (
        <div className={'relative'}>

            <Popover>
                {({open, close}) => (
                    <>
                        <div className={'flex'}>
                            <Popover.Button as={"div"} className={`${open || enabledCount ? "bg-modal-darker" : "bg-[#3E7EA6] text-neutral-200"} z-10 hover:bg-modal rounded-box hover:cursor-pointer ring-0  border-0 !active:border-0 !active:border-0 !focus:ring-0 !focus:border-0  py-1 px-2 ${filterParams.due ? "rounded-l-box rounded-r-none" : ""}`}>

                                <div className={`flex items-center space-x-2 `}>
                                    <div><BsFilter/></div>
                                    <div className={'text-sm'}>Filters</div>
                                    {enabledCount ?
                                        <div className={'rounded-full w-5 h-5 bg-white flex items-center justify-center text-xs'}>{enabledCount}</div> : ""}
                                </div>
                            </Popover.Button>
                            {enabledCount
                                ? (
                                    <div className={'flex items-center bg-modal-darker rounded-r-box hover:bg-modal'}>
                                        <button onClick={resetFilter}><BsX className={'h-5 w-6'}/>
                                        </button>
                                    </div>
                                )
                                : ""}
                        </div>
                        <Popover.Panel static={false} className="absolute left-0 z-10 mt-3 w-80 _px-4 sm:px-0 lg:max-w-3xl">
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

                                            {/*<div className={'flex items-center space-x-2 mb-2'}>*/}
                                            {/*    <input name={"noDue"} type={"checkbox"}*/}
                                            {/*        // checked={filters["due"][] == null}*/}
                                            {/*           onChange={(e) => setFilter(e, null)}*/}
                                            {/*    />*/}
                                            {/*    <div>No filter</div>*/}
                                            {/*</div>*/}

                                            <div className={'flex items-center space-x-2 mb-2'}>
                                                <input name={"today"} type={"checkbox"}
                                                       // checked={filterParams.due.includes("today") }
                                                       onClick={(e) => {
                                                           setDueFilter(e, "today")
                                                       }}/>
                                                <div>Today</div>
                                            </div>


                                            {/*<div className={'flex items-center space-x-2 mb-2'}>*/}
                                            {/*    <input name={"tomorrow"} type={"checkbox"}*/}
                                            {/*           checked={filterParams && filterParams?.due && filterParams.due.includes("tomorrow")}*/}
                                            {/*           onChange={(e) => setDueFilter(e, "tomorrow")}/>*/}
                                            {/*    <div className={'flex items-center justify-start space-x-2'}>*/}
                                            {/*        <FiClock className={'bg-[#EDD747] rounded-full text-white h-5 w-5'}/>*/}
                                            {/*        <div>Tomorrow</div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}


                                            {/*<div className={'flex items-center space-x-2 mb-2'}>*/}
                                            {/*    <input name={"overdue"} type={"checkbox"}*/}
                                            {/*           checked={filterParams && filterParams?.due && filterParams.due.includes("overdue")}*/}
                                            {/*           onChange={(e) => setDueFilter(e, "overdue")}/>*/}
                                            {/*    <div className={'flex items-center justify-start space-x-2'}>*/}
                                            {/*        <FiClock className={'bg-red-600 rounded-full text-white  h-5 w-5'}/>*/}
                                            {/*        <div>Overdue</div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}


                                            {/*<div className={'text-sm text-neutral-500 font-semibold mt-3 mb-2 '}>Labels</div>*/}
                                            {/*{project.labels.map(label => {*/}

                                            {/*    return (*/}
                                            {/*        <div key={label.id} className={'mb-2 flex items-center space-x-2'}>*/}
                                            {/*            <input checked={filterParams && filterParams?.labels && filterParams.labels.includes(label.id)} type={"checkbox"} onChange={(e) => setLabelFilter(e, label.id)}/>*/}
                                            {/*            <div className={'w-full'}><Label label={label}/></div>*/}
                                            {/*        </div>*/}
                                            {/*    )*/}
                                            {/*})}*/}

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
