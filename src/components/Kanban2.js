import React, {useState, useEffect} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {store} from "../redux/store";
import AddTask from "./AddTask";
import Card from "./Card";
import {getProject, reorderTasks} from "../redux/dataSlice";
import {useDispatch} from "react-redux";
import CardModal from "./CardModal";
import ColumnAdder from "./ColumnAdder";


const Kanban2 = ({project}) => {

    const [board, setBoard] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        setBoard({columns: store.getState().data.project.columns})
    }, [project])

    let cols = []

    const onDragEnd = (result, columns) => {
        // if (!result.destination) return;
        // const {source, destination} = result;
        //
        // if (source.droppableId !== destination.droppableId) {
        //
        //     const sourceColumn = columns.find(col => source.droppableId === col.id)
        //     const destColumn = columns.find(col => destination.droppableId === col.id)
        //
        //     const sourceColumnIndex = columns.findIndex(col => source.droppableId === col.id)
        //     const destColumnIndex = columns.findIndex(col => destination.droppableId === col.id)
        //
        //     const sourceItems = [...sourceColumn.cards];
        //     const destItems = [...destColumn.cards];
        //     const [removed] = sourceItems.splice(source.index, 1);
        //     destItems.splice(destination.index, 0, removed);
        //
        //
        //     cols = Object.values([...columns])
        //
        //     cols[sourceColumnIndex] = {
        //         ...cols[sourceColumnIndex],
        //         cards: sourceItems
        //     }
        //
        //     cols[destColumnIndex] = {
        //         ...cols[destColumnIndex],
        //         cards: destItems
        //     }
        //
        //     setBoard({columns: cols})
        //
        //     const sourceCards = cols[sourceColumnIndex].cards
        //     const destCards = cols[destColumnIndex].cards
        //
        //     const sCards = sourceCards.map((card, index) => {
        //         return {
        //             id: card.id,
        //             columnId: source.droppableId,
        //             position: index
        //         }
        //     })
        //
        //     const dCards = destCards.map((card, index) => {
        //         return {
        //             id: card.id,
        //             columnId: destination.droppableId,
        //             position: index
        //
        //         }
        //     })
        //     dispatch(reorderTasks(sCards)).unwrap().then(r => {
        //         dispatch(reorderTasks(dCards)).unwrap()
        //     })
        //
        //
        // } else {
        //     const column = columns.find(col => source.droppableId === col.id)
        //     const columnIndex = columns.findIndex(col => source.droppableId === col.id)
        //
        //     const copiedItems = [...column.cards];
        //     const [removed] = copiedItems.splice(source.index, 1);
        //     copiedItems.splice(destination.index, 0, removed);
        //
        //     cols = Object.values([...columns])
        //
        //     cols[columnIndex] = {
        //         ...cols[columnIndex],
        //         cards: copiedItems
        //     }
        //     setBoard({columns: cols})
        //
        //     const cards = cols[columnIndex].cards
        //     const orderedCards = cards.map((card, index) => {
        //         return {
        //             id: card.id,
        //             position: index,
        //         };
        //     })
        //     dispatch(reorderTasks(orderedCards)).unwrap()
        // }
    };

    const addCard = (card) => {

        const column = store.getState().data.project.columns.find(col => col.id === card.columnId)
        const cards = column.cards
        const orderedCards = cards.map((card, index) => {
            return {
                id: card.id,
                position: index,
            };
        })
        dispatch(reorderTasks(orderedCards)).unwrap()
    }

    const Column = () => {
        return (
            <Draggable draggableId={"Title"} index={1}>
                {(provided, snapshot) => (
                    <div>KAlle</div>
                )}
            </Draggable>
        )
    }

    if (board.columns && board.columns.length) {

        return (
            <div>
                <div className={'text-white font-bold text-lg mb-2 px-4 pt-2'}>{project.title}</div>
                <div className={'overflow-x-auto h-[calc(100vh-6rem)] px-4'}>
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, board.columns)}>
                        <div className={'grid grid-flow-col col-start-1 gap-x-4 auto-cols-[292px] items-start rounded-box'}>


                            {board.columns.map(column => {
                                return (
                                    <Droppable key={column.title} droppableId={column.id}>
                                        {(provided) => (
                                            <div className={'bg-modal rounded-box'}
                                                 ref={provided.innerRef}
                                                 {...provided.droppableProps}>
                                                <AddTask column={column} project={project} addCard={addCard}/>
                                                <div className={'rounded-box mb-1 px-2.5 pb-2.5 max-h-[calc(100vh-13rem)] overflow-y-auto overflow-x-hidden'}>
                                                    {column.cards.map((card, index) => {
                                                        return <Card key={card.id} card={card} index={index}/>
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            </div>

                                        )}
                                    </Droppable>
                                );
                            })}

                            <ColumnAdder projext={project}/>
                        </div>
                    </DragDropContext>
                    <CardModal project={project}/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className={'text-white font-bold text-lg mb-2 px-4 pt-2'}>{project.title}</div>
                <div className={'px-4 w-[310px]'}><ColumnAdder project={project}/></div>
            </div>
        )
    }
}

export default Kanban2;
