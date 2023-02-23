import ChecklistItem from "./ChecklistItem";
import {BsCheck2Square, BsTextLeft} from "react-icons/bs";
import {useState} from "react";

export default function Checklist({list}) {

    const [percentage, setPercentage] = useState(25)

    return (
        <div className={'pl-1 my-4'}>
            <div className={'absolute left-6 mt-0.5'}><BsCheck2Square className={'h-5 w-5'}/></div>
            <div className={'font-semibold text-base my-2'}>{list?.name}</div>

            <div className="my-3 h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className="h-1 bg-green-500" style={{width: "25%"}}/>
            </div>

            {list?.checklist_items.map(item => {
                return <ChecklistItem key={item.id} item={item}/>
            })}

            <button className={'bg-modal-darker py-1 px-2 rounded-box ml-6 my-2 text-sm'}>Add item</button>
        </div>
    )
}
