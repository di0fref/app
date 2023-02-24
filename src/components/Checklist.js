import ChecklistItem from "./ChecklistItem";
import {BsCheck2Square, BsTextLeft} from "react-icons/bs";
import {useState, useEffect} from "react";
import {CardModelButton} from "./CardModal";

export default function Checklist({list, card}) {

    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        setPercentage(list.checklist_items.filter(item => item.done).length / list.checklist_items.length * 100)
    }, [list])

    return (
        <div className={'pl-1 my-4'}>
            <div className={'absolute left-6 mt-2.5'}><BsCheck2Square className={'h-5 w-5'}/></div>
            <div className={'flex items-center justify-between'}>
                <div className={'font-semibold text-base my-2'}>{list?.name}</div>
                <div><CardModelButton value={"Delete"}/></div>
            </div>

            <div className={'pl-2 mt-3'}>
                <div className="my-3 h-2 w-full bg-neutral-200 relative rounded">
                    <div className={'absolute -left-9 -top-1.5 text-xs'}>{percentage}%</div>
                    <div className={`${(percentage === 100) ? "bg-green-500" : "bg-blue-600"} h-2 rounded `} style={{width: percentage + "%"}}/>
                </div>
            </div>

            {list?.checklist_items.map(item => {
                return <ChecklistItem card={card} key={item.id} item={item}/>
            })}

            <button className={'bg-modal-darker py-1 px-2 rounded-box ml-2 my-2 text-sm'}>Add item</button>
        </div>
    )
}
