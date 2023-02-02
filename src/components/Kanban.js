import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    updateTask,
    getColumns,
    addColumn as add,
    addTask,
    getProject,
    sortTasks,
    reorderTasks
} from "../redux/dataSlice";
import Card from "./Card";
import Login from "./Login";
import Board, {addCard, addColumn} from '@asseinfo/react-kanban'
import AddTask from "./AddTask";
import {delay, sortF} from "../helper.js"
import {get} from "axios";
import {store} from "../redux/store";
import moveCard from "@asseinfo/react-kanban"

export default function Kanban() {

    const dispatch = useDispatch();

    const __board = useSelector(state => {

        try {
            state.data.project.columns && state.data.project.columns
                .map(col => col).sort((a, b) => sortF(a, b, "order"))

            state.data.project.columns && state.data.project.columns
                .map(col => col.cards.map(card => card).sort((a, b) => sortF(a, b, "position")))

            // console.log("useSelector done");
            return state.data.project.columns

        } catch (err) {
            // console.log(err);
        }

    })
    const board = useSelector(state => state.data.project.columns)

    // && state.data.project.columns
    //     .filter(col => col.cards.filter(card => card).sort((a, b) => sortF(a, b, "position"))))
// console.log(board);

    const __onCardDragEnd = async (card, source, destination) => {

        console.log("Dest", destination.toPosition);
        const data = {
            id: card.id,
            columnId: destination.toColumnId,
            position: destination.toPosition,

            oldColumnId: source.fromColumnId,
            oldPosition: source.fromPosition,
            title: card.title
        }

        await dispatch(updateTask(data))

        const sourceColumn = board.find(col => col.id === source.fromColumnId);
        const destinationColumn = board.find(col => col.id === destination.toColumnId);


        delay(500).then(test => {
            destinationColumn.cards.map((c, index) => {

                // console.log(c.title, c.position, card.id === c.id ? "Moved" : null);

                // dispatch(sortTasks({
                //     id: c.id,
                //     position: index
                // }))

                console.log(c.title, {
                    position: index
                });

            })
        })
        //
        console.log("----------------------");
        //
        // if (destination.toColumnId !== source.fromColumnId) {
        //     sourceColumn.cards.map((card, index) => {
        //         dispatch(sortTasks({
        //             id: card.id,
        //             position: index
        //         }))
        //     })
        // }


    }
    // const onColumnDragEnd = (board, column, source, destination) => {
    //     board.columns.map((column, index) => {
    //         dispatch(updateColumn({
    //             id: column.id, order: index
    //         }))
    //     })
    // }
    //

    const onCardDragEnd = async (board, card, source, destination) => {

        const cards = board.columns.map(column => column.cards.map(card => {
            return {
                id: card.id,
                col: column.id
            }
        })).flat()

        const orderedCards = cards.map((card, index) => {
            return {
                id: card.id,
                position: index,
                columnId: card.col
            };
        })
        dispatch(reorderTasks(orderedCards))

    }
    if (board && Object.values(board).length) {
        return (
            <Board
                onCardDragEnd={onCardDragEnd}
                renderColumnHeader={(props) => (
                    <AddTask {...props}/>
                )}
                renderCard={(card, index) => (
                    <Card key={card.id} card={card}/>
                )}
                allowRemoveLane
                allowRenameColumn
                allowRemoveCard
                onLaneRemove={console.log}
                onCardRemove={console.log}
                onLaneRename={console.log}
                initialBoard={{columns: board}}
                // allowAddCard={{on: "top"}}
                onNewCardConfirm={draftCard => ({
                    id: new Date().getTime(),
                    ...draftCard
                })}
                onCardNew={console.log}
            />
        );
    } else {
        return <div></div>
    }
    // if (board && Object.values(board).length) {
    //     return (
    //         // <></>
    //         <Board
    //             onCardDragEnd={onCardDragEnd}
    //             renderColumnHeader={(props) => (
    //                 <AddTask {...props}/>
    //             )}
    //             allowAddCard={{on: 'bottom'}}
    //             renderCard={(card, index) => {
    //                 return <Card key={card.id} card={card}/>
    //             }}>
    //             {{columns: board}}
    //         </Board>
    //     )
    // } else {
    //     return <div></div>
    // }

}