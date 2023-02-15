import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {updateField} from "../redux/dataSlice";


const Field = ({field}) => {

    const [initialValue, setInitialValue] = useState(field.value || "")
    const [value, setValue] = useState(field.value || "")
    const dispatch = useDispatch();

    const saveField = () => {


        if (1 || value !== initialValue) {
            console.log("fhjg")
            dispatch(updateField({
                id: field.id,
                value: value
            })).unwrap()
        }
    }

    return (
        <div className={'border_'}>
            <div className={'text-xs text-neutral-500 font-semibold mb-2 '}>{field.name}</div>
            <input value={value} onBlur={saveField} onChange={e => setValue(e.target.value)} className={'text-md bg-modal-dark border-none h-8 focus:bg-white'} type={"text"}/>
        </div>
    )
}


export default function CardFields() {
    const currentCard = useSelector(state => state.data.currentCard)

    return (
        <>
            <div className={'flex flex-wrap gap-4 '}>
                {currentCard?.card_fields.map(field => {
                    return (
                        <Field key={field.id} field={field}/>
                    )
                })}
            </div>
        </>
    )
}
