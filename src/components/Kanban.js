import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    updateTask,
    getColumns,
    addTask,
    getProject,
    reorderTasks,
    setBoard,
    addColumn
} from "../redux/dataSlice";
import Card from "./Card";
import Login from "./Login";
import Board, {addCard, moveCard} from '@di0fref/react-kanban'
import AddTask from "./AddTask";
import {delay, sortF} from "../helper.js"
import CardModal from "./CardModal";
import {store} from "../redux/store";
import ColumnAdder from "./ColumnAdder";
import Card2 from "./Card2";


export default function Kanban({project}) {

    const dispatch = useDispatch();

    const currentCard = useSelector(state => state.data.currentCard)
    const [isOpen, setIsOpen] = useState(true)

    const [board, setBoard] = useState([])

    useEffect(() => {
        setBoard({columns: store.getState().data.project.columns})
    }, [project])

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
        dispatch(reorderTasks(orderedCards)).then(res => dispatch(getProject(project.id)))
    }

    const addNewCard = (card, columnId) => {
        // const updatedBoard = addCard(board, {id: columnId}, card)
        // setBoard(updatedBoard)
    }
    const onNewColumnConfirm = (value) => {
        dispatch(addColumn({
            title: value,
            projectId: project.id
        }))
        // addColumn(board, )
    }
    try {
        if (board.columns && board.columns.length) {
            return (
                <div className={'p-3'}>
                    <Board
                        allowAddColumn
                        onNewColumnConfirm={onNewColumnConfirm}
                        renderColumnAdder={() => <ColumnAdder onNewColumnConfirm={onNewColumnConfirm}/>}
                        onCardDragEnd={handleCardMove}
                        renderColumnHeader={(props) => (
                            <AddTask {...props} addNewCard={addNewCard}/>
                        )}
                        allowAddCard={{on: 'top'}}
                        renderCard={(card, index) => {
                            return <Card2 key={card.id} card={card}/>
                        }}>
                        {board}
                    </Board>
                    <CardModal project={project}/>
                </div>

            )
        } else {
            return <div/>
        }
    } catch (e) {
        console.log(e);
    }
}
