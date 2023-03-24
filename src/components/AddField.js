import {TwitterPicker, AlphaPicker, CirclePicker} from "react-color";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLabel, addField, getProject} from "../redux/dataSlice";
import Label from "./Label";
import color from "color";
import {Listbox} from "@headlessui/react"
import {ChevronDownIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import {BsTrash} from "react-icons/bs";

function DropdownOptionEdit({option}) {
    return (
        <div className={'flex items-center justify-between space-y-4 px_-2'}>
            <div className={'text-md'}>{option.value}</div>
            <BsTrash className={'text-neutral-400 h-3 w-3'}/>
        </div>
    )
}


export default function AddField({close}) {

    const project = useSelector(state => state.data.project)

    const [error, setError] = useState(false)
    const [ddEmptyError, setDdEmptyError] = useState(false)
    const [typeError, setTypeError] = useState(false)

    const [name, setName] = useState("")
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [_color_, setColor] = useState("")
    const ref = useRef(null)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState("Select")

    const [dropdownValues, setDropdownValues] = useState([])
    const [currentOption, setCurrentOption] = useState("")


    useEffect(() => {
        setTypeError(false)
    }, [selected])

    const saveField = () => {

        if (selected == "Select") {
            setTypeError(true)
            return;
        }

        if (selected.toLowerCase() === "dropdown" && !dropdownValues.length) {
            setDdEmptyError(true)
            return;
        }

        if (name === "") {
            setError(true)
            return
        }

        if (selected.toLowerCase() === "dropdown") {
            dropdownValues.unshift({
                option: "",
                value: "Select"
            })
        }

        const data = {
            projectId: project.id,
            title: name,
            type: selected.toLowerCase(),
            options: JSON.stringify(dropdownValues) || null
        }

        dispatch(addField(data)).unwrap().then(r => {
            dispatch(getProject({
                id: project.id,
                filter: null
            }))
        })
        close()
    }

    const addDropdownOption = (e) => {
        setDropdownValues([
            ...dropdownValues,
            {
                option: currentOption,
                value: currentOption
            }
        ])
        setCurrentOption("")
        setDdEmptyError(false)
    }


    return (
        <div className={'w-80_ bg-white _shadow-all rounded'}>
            <div className={'p-4_'}>
                {/*<div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Create new*/}
                {/*    field*/}
                {/*</div>*/}

                <label htmlFor={"name"} className={'text-xs text-neutral-500 font-semibold mb-4'}>Title</label>
                <input autoFocus={true} ref={ref} className={'mt-1 border-1 border-neutral-300 text-md px-2 py-1.5 w-full  rounded-box '} type={"text"} onChange={(e) => {
                    setName(e.target.value)
                    setError(false)
                }}/>
                {error && <div className={'text-red-600 text-sm text-sm'}>Please give your field a title</div>}

            </div>
            <div>
                <div className={'px-4_ '}>
                    <div className={''}>
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">


                                <div className={'text-xs text-neutral-500 font-semibold mb-2'}>Type</div>
                                <Listbox.Button className="bg-modal justify-between inline-flex w-full justify-center rounded-md border border-gray-300_ bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 ">
                                    {selected}
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                                </Listbox.Button>
                                {typeError &&
                                    <div className={'text-red-600 text-sm text-sm'}>Please select a field type</div>}


                                <Listbox.Options static={false} className="absolute left-0 mt-2 w-full_ origin-top-right divide-y divide-gray-100 rounded-box bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Listbox.Option value={"Text"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Text</Listbox.Option>
                                        <Listbox.Option value={"Number"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Number</Listbox.Option>
                                        <Listbox.Option value={"Date"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Date</Listbox.Option>
                                        <Listbox.Option value={"Dropdown"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Dropdown</Listbox.Option>
                                    </div>
                                </Listbox.Options>
                            </div>
                        </Listbox>

                        {selected === "Dropdown" && (
                            <div className={''}>
                                <div className={"text-xs text-neutral-500 font-semibold mt-4 mb-1"}>Options</div>
                                {dropdownValues?.map((option) => (
                                    <DropdownOptionEdit key={option} option={option}/>
                                ))}
                                <div className={'flex items-center space-x-2 mt-3'}>
                                    <input onChange={e => setCurrentOption(e.target.value)} value={currentOption} type={"text"} className={"mt-1_ border-1 border-neutral-300 text-md px-2 py-1.5 w-full rounded-box"} placeholder={"Add option"}/>
                                    <button disabled={currentOption === ""} onClick={addDropdownOption} className={'disabled:opacity-25 text-sm rounded-box hover:cursor-pointer hover:bg-modal-darker bg-modal-dark px-2 py-2'}>Add</button>
                                </div>
                                {ddEmptyError &&
                                    <div className={'text-red-600 text-sm text-sm'}>Please add some options</div>}
                            </div>

                        )}

                    </div>

                    <div className={'flex justify-end_ space-x-2 py-4'}>
                        <button className={'save-btn mt-2'} onClick={saveField}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
