import {useEffect, useState} from "react";
import {store} from "../redux/store";
import Card from "./Card";
import AddTask from "./AddTask";

export default function Test({project}) {

    const [board, setBoard] = useState([])

    useEffect(() => {
        setBoard({columns: store.getState().data.project.columns})
    }, [project])

    // console.log(board)

    if (board?.columns && board.columns.length) {
        return (
            <div className={''}>
                <div className={'grid grid-flow-col col-start-1 gap-x-4 auto-cols-[272px] items-start rounded-box'}>

                    {board.columns.map(column => (
                        <div className={'bg-modal rounded-box'}>
                            <AddTask title={column.title}/>
                            <div className={'px-2.5 pb-2.5 max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden'}>
                                {column.cards.map(card => {
                                    return <Card card={card}/>
                                })}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        )
    }
}
