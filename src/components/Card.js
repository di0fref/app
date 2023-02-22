import {formatDate} from "../helper"
import {Link} from "react-router-dom";
import {BsPencil, BsTextLeft} from "react-icons/bs";
import SmallLabel from "./SmallLabel";
import DateBadge from "./DateBadge";
import {Draggable} from 'react-beautiful-dnd';
import {current} from "@reduxjs/toolkit";
import {GrTextAlignFull} from "react-icons/gr";
import {useEffect, useState} from "react";
import {HiArchive, HiOutlineArchive} from "react-icons/hi";

export default function Card({card, index}) {

    const [fieldHaveValues, setFieldHaveValues] = useState(false)

    const fieldsHaveValueCheck = () => {
        if (!card?.card_fields.length) {
            setFieldHaveValues(false)
        }
        const have = card?.card_fields.findIndex(field => field.value)

        setFieldHaveValues((have === -1) ? false : true)
    }


    useEffect(() => {
        fieldsHaveValueCheck()
    }, [])

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

                            {/*{card.status === "archived" ? (*/}
                            {/*    <div className={'pl-2 flex items-center space-x-2 bg-archive-warning mb-2'}>*/}
                            {/*        <HiOutlineArchive/>*/}
                            {/*    <div className={'font-semibold text-sm'}>This card is archived</div>*/}
                            {/*        </div>*/}
                            {/*) : ""}*/}

                            {card?.labels && card?.labels.length ? (
                                <div className={'pb-1.5'}>

                                    <div className={'flex flex-wrap gap-1.5'}>
                                        {card.labels.map(label => {
                                            return <SmallLabel key={label.id} label={label}/>
                                        })}
                                    </div>

                                </div>
                            ) : ""}

                            <div className={'flex-grow pb-2 text-md'}>
                                <span className={'text-red-500 text-sm_ font-semibold'}>#{card.number}</span> {card.title}
                            </div>

                            <div className={'flex items-center justify-between space-x-2 _bg-red-300'}>
                                <div className={'text-sm'}><DateBadge date={card.due}/></div>
                                {card?.text ?
                                    <div className={''}><BsTextLeft className={'h-4 w-4 text-neutral-500'}/></div> : ""}
                            </div>


                            {fieldHaveValues ? (
                                <div className={'my-2'}>
                                    <div className={'flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500'}>
                                        {card.card_fields.map(field => (
                                            field.value &&
                                            <div className={''} key={field.id}>{field.name}: {field.value}</div>
                                        ))}
                                    </div>
                                </div>
                            ) : ""}

                        </div>
                    </Link>
                </div>
            )}
        </Draggable>
    )
}
