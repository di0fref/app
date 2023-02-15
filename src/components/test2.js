import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import AddField from "./AddField";
import AddTask from "./AddTask";
import Card from "./Card";

export default function Test() {

    return (
        <DragDropContext>

            <Droppable droppableId={"board"} direction="horizontal" type={"col"}>

                {(provided) => (
                    <div ref={provided.innerRef}{...provided.droppableProps}>

                        <div className={'grid grid-flow-col col-start-1 gap-x-4 auto-cols-[292px] items-start rounded-box'}>

                            <Draggable draggableId={"fuckSake"} index={1}>
                                {(provided) => (
                                    <div className={'bg-modal rounded-box'} type={"col"} ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                                        <div>Title</div>
                                        <AddTask/>
                                        <Droppable droppableId={"drop-1"} type={"card"}>
                                            {(provided) => (
                                                <div ref={provided.innerRef}{...provided.droppableProps}>
                                                    <Card index={1} card={{
                                                        title: "Kalle",
                                                        id: "1"
                                                    }}/>
                                                    <Card index={2} card={{
                                                        title: "Kalle",
                                                        id: "2"
                                                    }}/>
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </Draggable>

                            <Draggable draggableId={"fuckSake2"} index={2}>
                                {(provided) => (
                                    <div className={'bg-modal rounded-box'} type={"col"} ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                                        <div>Title</div>
                                        <AddTask/>
                                        <Droppable droppableId={"drop-2"} type={"card"}>
                                            {(provided) => (
                                                <div ref={provided.innerRef}{...provided.droppableProps}>
                                                    <Card index={3} card={{
                                                        title: "Kalle",
                                                        id: "13"
                                                    }}/>
                                                    <Card index={4} card={{
                                                        title: "Kalle",
                                                        id: "2g"
                                                    }}/>
                                                </div>
                                            )}
                                        </Droppable>
                                    </div>
                                )}
                            </Draggable>



                        </div>

                    </div>

                )}

            </Droppable>

        </DragDropContext>
    )
}
