import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";

import {getProjects, setUser} from "../redux/dataSlice";
import {useParams} from "react-router-dom";
import Card from "./Card";
import {groupBy, sortGroup, sortF} from "../helper";
import {da} from "date-fns/locale";
import {socket} from "../redux/store";
import AddTask from "./AddTask";

export default function Project() {
    const dispatch = useDispatch()
    const params = useParams();

    const cards = useSelector(state => {
        const project = state.data.project
        return project?.cards && groupBy(project.cards, "status");
    })

    // useEffect(()=>{
    //     socket.emit("update",{
    //         whoot: "klalle"
    //     })
    // },[params.id])

    const isConnected = useSelector(state => state.data.isConnected ? "Connected" : "")
    const isEstablishingConnection = useSelector(state => state.data.isEstablishingConnection ? "Connecting..." : "")

    return (
        // <div>
        //     <div>Status: {isConnected}{isEstablishingConnection}</div>
        //     <div><AddTask projectId={params.id}/></div>
        //     {cards && Object.keys(cards).length
        //         ? Object.keys(cards).map((group) => (
        //             <div key={group}>
        //                 {group}
        //                 {Object.values(cards[group]).map((card, i) => {
        //                     return (<Card key={card.id} card={card}/>)
        //                 })}
        //             </div>
        //         ))
        //         : ""}
        //
        // </div>

        <div><div><AddTask projectId={params.id}/></div>
            <div className={'flex space-x-4 '}>
                {
                    cards && Object.keys(cards).length ?
                        Object.keys(cards).map((group) => (

                            <div className={'bg-[#ebecf0] px-2 py-2 w-64 rounded'}>
                                <div className={'font-semibold '}>{group}</div>

                                {Object.values(cards[group]).map((card, i) => {
                                    return (<Card key={card.id} card={card}/>)
                                })}

                            </div>

                        ))
                        : ""}
            </div>
        </div>

        // <div className={'flex'}>
        //     {cards && Object.keys(cards).length
        //
        //         ? Object.keys(cards).map((group) => (
        //             <div key={group}>
        //                 {group}
        //                 {Object.values(cards[group]).map((card, i) => {
        //                     return (<Card key={card.id} card={card}/>)
        //                 })}
        //             </div>
        //         ))
        //         : ""}
        // </div>
    )
}