import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import AddField from "./AddField";
import AddTask from "./AddTask";
import Card from "./Card";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {socket, store} from "../redux/store";
import React from "react";
import ColumnAdder from "./ColumnAdder";
import {getProject, getUpdatedCard, reorderTasks, setBoard, updateColumn} from "../redux/dataSlice";
import CardModal from "./CardModal";
import Filters from "./Filters";
import {useReadLocalStorage} from "usehooks-ts";
import {createSelector} from "@reduxjs/toolkit";
import {format, add} from "date-fns";
import {dbDateFormat} from "../helper";
import {useParams} from "react-router-dom";
import {ArrayParam, useQueryParam, withDefault} from "use-query-params";
import {myLabelParams, myDueParams} from "./Filters";
import AuditLog from "./AuditLog"
import Members from "./Members";
import {arrayMoveImmutable} from 'array-move';

export default function Board({project}) {

    const dispatch = useDispatch();
    const board = useSelector(state => state.data.project)
    const params = useParams()

    const [labelParams, setLabelParams] = useQueryParam("labels", myLabelParams)
    const [dueParams, setDueParams] = useQueryParam("due", myDueParams)

    useEffect(() => {

        if (labelParams || dueParams) {
            const projectFilters = {
                labels: labelParams.map(label => label),
                due: dueParams.map((type, index) => {
                    switch (type) {
                        case "today":
                            return format(new Date(), dbDateFormat)
                        case "tomorrow":
                            return format(add(new Date(), {days: 1}), dbDateFormat)
                        case "overdue":
                            return ""
                    }
                }) || []
            }
            dispatch(getProject({
                id: params.projectId,
                filter: projectFilters
            })).unwrap()
        } else {
            dispatch(getProject({
                id: params.projectId,
                filter: null
            })).unwrap()
        }

    }, [dueParams, labelParams])


    const onDragEnd = (result, columns) => {

        console.log("Starting");
        const {type} = result;
        const {source, destination, draggableId} = result;

        console.log(result);


        if (type === "col") {

            if (source.index === destination.index) {
                /* Bail early */
                return
            }
            const sourceColumn = columns[source.index]
            const destColumn = columns[destination.index]

            const newColumns = arrayMoveImmutable(columns, source.index, destination.index)
            newColumns.map((column, index) => {
                dispatch(updateColumn({
                    id: column.id,
                    order: index
                }))
            })
            dispatch(setBoard(newColumns))
            socket.emit("card reorder", {
                board: columns,
                room: project.id
            })
        }

        if (type === "card") {
            let cols = []
            if (!result.destination) return;

            if (source.droppableId === destination.droppableId && source.index === destination.index) {
                /* Bail early */
                return
            }

            if (source.droppableId !== destination.droppableId) {

                const sourceColumn = columns.find(col => source.droppableId === col.id)
                const destColumn = columns.find(col => destination.droppableId === col.id)

                const sourceColumnIndex = columns.findIndex(col => source.droppableId === col.id)
                const destColumnIndex = columns.findIndex(col => destination.droppableId === col.id)

                /* What card did we move */
                // const card = columns[sourceColumnIndex].cards[]

                const sourceItems = [...sourceColumn.cards];
                const destItems = [...destColumn.cards];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);


                cols = Object.values([...columns])

                cols[sourceColumnIndex] = {
                    ...cols[sourceColumnIndex], cards: sourceItems
                }

                cols[destColumnIndex] = {
                    ...cols[destColumnIndex], cards: destItems
                }

                dispatch(setBoard(cols))

                const sourceCards = cols[sourceColumnIndex].cards
                const destCards = cols[destColumnIndex].cards

                const sCards = sourceCards.map((card, index) => {
                    return {
                        id: card.id, columnId: source.droppableId, position: index, columnId: card.columnId
                    }
                })

                const dCards = destCards.map((card, index) => {
                    return {
                        id: card.id,
                        columnId: destination.droppableId,
                        position: index,

                    }
                })
                dispatch(reorderTasks(sCards)).unwrap().then(r => {
                    dispatch(reorderTasks(dCards)).unwrap().then(t => {
                        dispatch(setBoard(cols))
                        dispatch(getUpdatedCard(draggableId))
                    })
                })

                socket.emit("card reorder", {
                    board: cols,
                    room: project.id
                })


            } else {
                const column = columns.find(col => source.droppableId === col.id)
                const columnIndex = columns.findIndex(col => source.droppableId === col.id)

                const copiedItems = [...column.cards];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);

                cols = Object.values([...columns])

                cols[columnIndex] = {
                    ...cols[columnIndex], cards: copiedItems
                }
                dispatch(setBoard({columns: cols}))
                console.log("Done setting board");
                const cards = cols[columnIndex].cards
                const orderedCards = cards.map((card, index) => {
                    return {
                        id: card.id,
                        position: index,
                        columnId: card.columnId
                    };
                })
                dispatch(reorderTasks(orderedCards)).unwrap()
                dispatch(setBoard(cols))
                console.log("Done reordering");
                socket.emit("card reorder", {
                    board: cols,
                    room: project.id
                })
            }
        }
    }

    const addCard = (card) => {

        const column = store.getState().data.project.columns.find(col => col.id === card.columnId)
        const cards = column.cards
        const orderedCards = cards.map((card, index) => {
            return {
                id: card.id,
                position: index,
                columnId: card.columnId
            };
        })
        dispatch(reorderTasks(orderedCards))
    }

    if (board?.columns && board?.columns.length) {

        return (<div className={'relative'}>
            <div className={'flex items-center space-x-6'}>
                <div className={'text-white font-bold text-lg mb-2 px-4 pt-2 whitespace-nowrap'}>{project.title}</div>
                <Filters project={project}/>
                <Members project={project}/>
                <div className={'flex w-full bg-white_ justify-end '}>
                    <div className={'w-8 h-8 mr-2'}><AuditLog project={project}/></div>
                </div>
            </div>

            <div className={'overflow-x-auto h-[calc(100vh-6rem)] px-4 '}>

                <div className={'flex items-start space-x-4'}>
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, board.columns)}>
                        <Droppable droppableId={"board"} direction="horizontal" type={"col"}>
                            {(provided) => (<div ref={provided.innerRef}{...provided.droppableProps}>
                                <div className={'grid grid-flow-col col-start-1 gap-x-4 auto-cols-[292px] items-start rounded-box'}>
                                    {board.columns.map((column, i) => {
                                        return (
                                            <Draggable key={column.id} draggableId={column.id} index={i} type={"col"}>
                                                {(provided) => (
                                                    <div className={'bg-modal rounded-box  w-[292px]'} ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                                                        <AddTask column={column} project={project} addCard={addCard}/>
                                                        <Droppable droppableId={column.id} type={"card"}>
                                                            {(provided) => (
                                                                <div ref={provided.innerRef}{...provided.droppableProps}>
                                                                    <div className={'rounded-box mb-1 px-2.5 pb-2.5 max-h-[calc(100vh-13rem)] overflow-y-auto overflow-x-hidden'}>
                                                                        {column.cards.map((card, index) => {
                                                                            return (card.status !== "Archived") &&
                                                                                <Card key={card.id} card={card} index={index}/>
                                                                        })}
                                                                        {provided.placeholder}
                                                                    </div>
                                                                </div>)}
                                                        </Droppable>
                                                    </div>)}
                                            </Draggable>)
                                    })}
                                    {provided.placeholder}
                                </div>
                            </div>)}
                        </Droppable>
                        <CardModal project={project}/>
                    </DragDropContext>
                    <ColumnAdder project={project}/>
                </div>
            </div>
        </div>)
    } else {
        return (<div>
            <div className={'text-white font-bold text-lg mb-2 px-4 pt-2'}>{project.title}</div>
            <div className={'px-4 w-[310px]'}><ColumnAdder project={project}/></div>
        </div>)
    }
}
