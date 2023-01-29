import {useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getProjects, setUser} from "../redux/dataSlice";
import {useParams} from "react-router-dom";
import Card from "./Card";

export default function Project() {
    const dispatch = useDispatch()
    const params = useParams();
    const project = useSelector(state => state.data.projects.find(project => project.id == params.id))

    const isConnected = useSelector(state => state.data.isConnected ? "Connected" : "")
    const isEstablishingConnection = useSelector(state => state.data.isEstablishingConnection ? "Connecting..." : "")

    return (
        <div>
            Status: {isConnected}{isEstablishingConnection}
            <div>{project?.title}</div>
            {project?.cards.map(card => {
                return <Card key={card.id} card={card}/>
            })}

        </div>
    )
}