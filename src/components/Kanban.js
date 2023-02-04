import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    updateTask,
    getColumns,
    addColumn as add,
    addTask,
    getProject,
    sortTasks,
    reorderTasks,
    setBoard
} from "../redux/dataSlice";
import Card from "./Card";
import Login from "./Login";
import Board, {addCard, addColumn, moveCard} from '@lourenci/react-kanban'
import AddTask from "./AddTask";
import {delay, sortF} from "../helper.js"
import {store} from "../redux/store";
import CardModal from "./CardModal";
import {ca} from "date-fns/locale";

export default function Kanban({project}) {

    const dispatch = useDispatch();

    const board = {columns: useSelector(state => state.data.project.columns)}

    const currentCard = useSelector(state => state.data.currentCard)
    const [isOpen, setIsOpen] = useState(true)

    // && state.data.project.columns
    //     .filter(col => col.cards.filter(card => card).sort((a, b) => sortF(a, b, "position"))))
// console.log(board);


    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        dispatch(setBoard(updatedBoard))
        const cards = updatedBoard.columns.map(column => column.cards.map(card => {
            return {
                id: card.id,
                col: column.id,
                title: card.title
            }
        })).flat()

        const orderedCards = cards.map((card, index) => {
            return {
                id: card.id,
                position: index,
                columnId: card.col,
                title: card.title
            };
        })
        dispatch(reorderTasks(orderedCards))
    }

    try {
        if (board.columns?.length) {
            return (
                <>
                    <Board
                        onCardDragEnd={handleCardMove}
                        renderColumnHeader={(props) => (
                            <AddTask {...props}/>
                        )}
                        allowAddCard={{on: 'top'}}
                        renderCard={(card, index) => {
                            return <Card key={card.id} card={card}/>
                        }}>
                        {board}
                    </Board>
                    <CardModal project={project}/>
                </>

            )
        } else {
            return <div></div>
        }
    } catch (e) {
        console.log(e);
    }


}