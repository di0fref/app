import {formatDate} from "../helper"
import {Link} from "react-router-dom";
import {BsPencil} from "react-icons/bs";
import SmallLabel from "./SmallLabel";
import DateBadge from "./DateBadge";
import {Draggable} from 'react-beautiful-dnd';

export default function Card({card, index}) {

    // console.log(card.id)

    return (
        <Draggable key={card.id} draggableId={card.id} index={index}>
            {(provided) => (
                <div
                    type={"card"}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <Link  to={"card/" + card.id} className={'group'}>

                        <div className={'mx-1_ hover:shadow-md p-2 mt-2 rounded-box bg-white shadow w-64_ _min-h-[6rem] hover:bg-neutral-50 relative'}>
                            {/*<BsPencil className={'w-3 h-3 absolute right-2 top-2 text-transparent group-hover:text-neutral-400'}/>*/}
                            <div className={'pb-1'}>
                                {/*Pos: {card.position}<br/>*/}
                                {/*Col: {card.columnId}*/}
                                {/*<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</span>*/}
                                {/*<span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>*/}

                                <div className={'flex flex-wrap gap-1'}>
                                    {card.labels && card.labels.map(label => {
                                        return <SmallLabel key={label.id} label={label}/>
                                    })}
                                </div>
                            </div>
                            <div className={'flex-grow pb-4 text-md'}>
                                <span className={'text-red-500 text-sm_ font-semibold'}>#{card.number}</span> {card.title}
                            </div>
                            <div className={'flex items-center space-x-4'}>
                                <div className={'text-xs'}><DateBadge date={card.due}/></div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </Draggable>
    )
}
