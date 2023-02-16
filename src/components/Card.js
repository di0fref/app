import {formatDate} from "../helper"
import {Link} from "react-router-dom";
import {BsPencil, BsTextLeft} from "react-icons/bs";
import SmallLabel from "./SmallLabel";
import DateBadge from "./DateBadge";
import {Draggable} from 'react-beautiful-dnd';
import {current} from "@reduxjs/toolkit";
import {GrTextAlignFull} from "react-icons/gr";

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
                    <Link to={"card/" + card.id} className={'group'}>

                        <div className={'mx-1_ hover:shadow-md p-2 mt-2 rounded-box bg-white shadow w-64_ _min-h-[6rem] hover:bg-neutral-50 relative'}>
                            {/*<BsPencil className={'w-3 h-3 absolute right-2 top-2 text-transparent group-hover:text-neutral-400'}/>*/}
                            <div className={'pb-1.5'}>
                                {/*Pos: {card.position}<br/>*/}
                                {/*Col: {card.columnId}*/}
                                {/*<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Green</span>*/}
                                {/*<span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Yellow</span>*/}

                                <div className={'flex flex-wrap gap-1.5'}>
                                    {card.labels && card.labels.map(label => {
                                        return <SmallLabel key={label.id} label={label}/>
                                    })}
                                </div>
                            </div>
                            <div className={'flex-grow pb-4 text-md'}>
                                <span className={'text-red-500 text-sm_ font-semibold'}>#{card.number}</span> {card.title}
                            </div>

                            <div className={'flex items-center justify-between space-x-2 _bg-red-300'}>
                                <div className={'text-sm'}><DateBadge date={card.due}/></div>
                                {card?.text? <div className={''}><BsTextLeft className={'h-4 w-4 text-neutral-500'}/></div>:""}
                            </div>
                            <div className={'my-2'}>
                                <div className={'flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500'}>
                                    {card.card_fields.map(field => (
                                        field.value && <div key={field.id}>{field.name}: {field.value}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            )}
        </Draggable>
    )
}
