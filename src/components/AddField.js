import {TwitterPicker, AlphaPicker, CirclePicker} from "react-color";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLabel, addField} from "../redux/dataSlice";
import Label from "./Label";
import color from "color";
import {Listbox} from "@headlessui/react"
import {ChevronDownIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";

export default function AddField({close}) {

    const project = useSelector(state => state.data.project)

    const [error, setError] = useState("")
    const [name, setName] = useState("")
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [_color_, setColor] = useState("")
    const ref = useRef(null)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState("Select")

    const saveField = () => {

        const data = {
            projectId: project.id,
            title: name,
            type: selected.toLowerCase()
        }

        dispatch(addField(data)).unwrap()
        // if (name === "") {
        //     setError("Please add a title")
        //     return false
        // }
        // if (color === "") {
        //     setError("Please choose a color")
        //     return false
        // }
        //
        // dispatch(addLabel({
        //     title: name,
        //     color: _color_,
        //     projectId: project.id
        // })).unwrap()
        close()
    }


    return (
        <div className={'w-80'}>
            <div className={'p-4'}>
                <div className={'text-sm text-neutral-500 font-semibold mb-4 text-center border-b pb-2'}>Create new
                    field
                </div>

                <label htmlFor={"name"} className={'text-sm text-neutral-500 font-semibold mb-4'}>Title</label>
                <input ref={ref} className={'mt-1 border-1 border-neutral-300 text-md px-2 py-1.5 w-full  rounded-box '} type={"text"} onChange={(e) => setName(e.target.value)}/>

                <div className={'text-red-600 text-sm'}>{error}</div>

            </div>
            <div>
                <div className={'px-4 '}>
                    <div className={''}>

                        {/*<div className="fixed top-16 w-56 text-right">*/}
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">


                                <div  className={'text-sm text-neutral-500 font-semibold mb-2'}>Type</div>
                                <Listbox.Button className="bg-modal justify-between inline-flex w-full justify-center rounded-md border border-gray-300_ bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 ">
                                    {selected}
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
                                </Listbox.Button>


                                <Listbox.Options static={false} className="absolute left-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-box bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="px-1 py-1 ">
                                        <Listbox.Option value={"Text"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Text</Listbox.Option>
                                        <Listbox.Option value={"Number"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Number</Listbox.Option>
                                        <Listbox.Option value={"Date"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Date</Listbox.Option>
                                        <Listbox.Option value={"Dropdown"} className={'hover:bg-modal block px-4 py-2 text-sm w-full text-left'} as={"button"}>Dropdown</Listbox.Option>
                                    </div>
                                </Listbox.Options>
                            </div>
                        </Listbox>
                        {/*</div>*/}

                    </div>
                    <div className={'flex justify-end_ space-x-2 py-4'}>
                        <button className={'save-btn mt-2'} onClick={saveField}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
