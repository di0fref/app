import {useDispatch, useSelector} from "react-redux";
import {useRef, useState} from "react";
import {getUpdatedCard, updateField} from "../redux/dataSlice";
import {Listbox} from "@headlessui/react";
import {HiChevronDown} from "react-icons/hi";
import {usePopper} from 'react-popper'
import validator from "validator";

const DropdownField = ({field, saveField}) => {

    // let [referenceElement, setReferenceElement] = useState()
    // let [popperElement, setPopperElement] = useState()
    // let {styles, attributes} = usePopper(referenceElement, popperElement, {
    //     placement: "bottom-end",
    //     strategy: 'absolute',
    // })

    const options = JSON.parse(field.project_field.options)
    const [initialValue, setInitialValue] = useState(field.value || "")
    const [value, setValue] = useState(field.value || "")

    const onChange = (e) => {
        setValue(e.target.value)
        saveField(initialValue, e.target.value)
    }
    // return (
    //     <Listbox as={"div"}>
    //         <Listbox.Button ref={setReferenceElement} className={'w-[150px] text-sm bg-modal-dark border-none h-8 focus:bg-white rounded-box'}>
    //             <div className={'flex items-center justify-between px-2'}>
    //                 <div>{field.value}</div>
    //                 <div><HiChevronDown/></div>
    //             </div>
    //         </Listbox.Button>
    //         <Listbox.Options ref={setPopperElement} style={{zIndex: 10, ...styles.popper}}{...attributes.popper}>
    //             <div className={'bg-white rounded w-[150px] shadow-all p-2'}>
    //                 {options.map(option => (
    //                     <Listbox.Option key={option} value={option}>
    //                         <div className={'text-sm py-0.5 hover:bg-modal-dark'}>{option}</div>
    //                     </Listbox.Option>
    //                 ))}
    //             </div>
    //         </Listbox.Options>
    //     </Listbox>
    // )
    return (
        <select defaultValue={field.value} onChange={onChange} className={'w-[150px] p-0 text-sm bg-modal-dark border-none h-8 pl-2 focus:bg-white rounded-box'}>
            {options.map(({option, value}) => (
                <option value={option} key={option}>{value}</option>
            ))}
        </select>
    )
}

const NumberField = ({field, saveField}) => {

    const [initialValue, setInitialValue] = useState(field.value || "")
    const [value, setValue] = useState(field.value || "")
    const [error, setError] = useState(false)
    const ref = useRef(null)

    const validate = (e) => {
        if (e.target.value !== "") {
            setError(!validator.isNumeric(e.target.value))
        }
        setValue(e.target.value)
    }
    const onBlur = () => {
        if (validator.isNumeric(value)) {
            saveField(initialValue, value)
        } else {
            setValue(initialValue)
        }
        setError(false)
    }

    return (
        <input ref={ref} placeholder={`Add ${field.name}...`} value={value} onBlur={onBlur} onChange={validate} className={`${error ? "focus:bg-red-300" : "focus:bg-white"} placeholder:text-sm w-[150px] text-md bg-modal-dark border-none h-8  rounded-box`} type={"text"}/>
    )
}

function TextField({field, saveField}) {
    const [initialValue, setInitialValue] = useState(field.value || "")
    const [value, setValue] = useState(field.value || "")

    const onBlur = () => {
        saveField(initialValue, value)
    }
    return (
        <input placeholder={`Add ${field.name}...`} value={value} onBlur={onBlur} onChange={e => setValue(e.target.value)} className={`placeholder:text-sm w-[150px] text-md bg-modal-dark border-none h-8 rounded-box`} type={"text"}/>
    )
}

const Field = ({field, card}) => {

    const dispatch = useDispatch();
    let actualField = ""

    const saveField = (initialValue, value) => {
        if (value !== initialValue) {
            dispatch(updateField({
                id: field.id,
                value: value,
                cardId: card.id
            })).unwrap().then(r => {
                dispatch(getUpdatedCard(card.id))
            })
        }
    }

    switch (field.project_field.type) {
        case "dropdown":
            actualField = <DropdownField field={field} saveField={saveField}/>
            break;
        case "text":
            actualField = <TextField field={field} saveField={saveField}/>
            break;
        case "number":
            actualField = <NumberField field={field} saveField={saveField}/>
            break;
        default:
            return ""
    }

    return (
        <div className={''}>
            <div className={'text-xs text-neutral-500 font-semibold mb-2 '}>{field.name}</div>
            {actualField}
        </div>

    )
}


export default function CardFields() {
    const currentCard = useSelector(state => state.data.currentCard)

    return (
        <>
            <div className={'flex flex-wrap gap-4'}>
                {currentCard?.card_fields.map(field => {
                    return (
                        <Field card={currentCard} key={field.id} field={field}/>
                    )
                })}
            </div>
        </>
    )
}
