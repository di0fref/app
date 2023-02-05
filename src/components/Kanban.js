import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    updateTask,
    getColumns,
    addTask,
    getProject,
    reorderTasks,
    setBoard
} from "../redux/dataSlice";
import Card from "./Card";
import Login from "./Login";
import  {addCard, addColumn, moveCard} from '@lourenci/react-kanban'
import Board from "../../kanban/src/components/Board.js"
import AddTask from "./AddTask";
import {delay, sortF} from "../helper.js"
import CardModal from "./CardModal";
import {store} from "../redux/store";

export default function Kanban({project}) {

    const dispatch = useDispatch();

    const currentCard = useSelector(state => state.data.currentCard)
    const [isOpen, setIsOpen] = useState(true)

    const [board, setBoard] = useState({columns: store.getState().data.project.columns})

    useEffect(() => {
        setBoard({columns: store.getState().data.project.columns})
    }, [project])


    // columns:
    //     useSelector(state => state.data.project.columns&&[...state.data.project.columns]
    //         .sort((a, b) => {
    //             return a.order - b.order
    //         }).map(column => {
    //             return {
    //                 ...column,
    //                 cards: [...column.cards].sort((a, b) => a.position - b.position)
    //             }
    //         }))

    // return sortedColumns.map(col => {
    //     return {
    //         ...col,
    //         cards: [...col.cards].sort((a,b) => a.position - b.position)
    //     }
    // })
    // }
    // })
    // }


    // console.log(board);


    function handleCardMove(_card, source, destination) {
        const updatedBoard = moveCard(board, source, destination);
        setBoard(updatedBoard)
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

    const addNewCard = (card, columnId) => {
        addCard(board, {id: columnId}, card, {on: "top"})
    }

    try {
        if (board.columns && board.columns.length) {
            return (
                <>
                    <Board
                        onCardDragEnd={handleCardMove}
                        renderColumnHeader={(props) => (
                            <AddTask {...props} addNewCard={addNewCard}/>
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