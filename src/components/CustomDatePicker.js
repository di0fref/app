import DatePicker from "react-datepicker";
import {HiChevronDown} from "react-icons/hi";
import {forwardRef, useEffect, useState} from "react";
import {formatDate} from "../helper";
import {BsClock} from "react-icons/bs";
import {FiClock} from "react-icons/fi";
import {CardModelButton} from "./CardModal";

export default function CustomDatePicker({_date, onDateChange, ...props}) {


    const [date, setDate] = useState(_date)

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        // <button onClick={onClick} className={`bg-modal-dark w-full h-9 px-2`}>
        //     <div className={' flex items-center space-x-2'}>
        //         <FiClock className={''}/>
        //         <div className={`text-sm`}>{date ? formatDate(date):"Select"}</div>
        //     </div>
        // </button>

        <CardModelButton className={'ml-0.5 md:ml-0'} onClick={onClick} value={value ? formatDate(value):"Select"} icon={<FiClock/>}/>
    ))

    useEffect(() => {
        setDate(_date)
    },[_date])

    const onChange = (value) => {
        onDateChange(value)
    }

    return (
        <DatePicker
            selected={date ? new Date(date) : null}
            onChange={onChange}
            customInput={
                <DateCustomInput/>
            }
            todayButton={"Today"}
            dateFormat={"yyyy-MM-dd"}>
        </DatePicker>
    )
}
