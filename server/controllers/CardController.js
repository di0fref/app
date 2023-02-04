import Card from "../models/Card.js";
import {io} from "../server.js"
import Label from "../models/Label.js";

export const getCards = async (req, res) => {
    try {
        const response = await Card.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const reorderCards = async (req, res) => {

    try {
        Object.values(req.body).map(card => {
            console.log(card);
            Card.update(card, {
                where: {
                    id: card.id
                }
            })
        })
        res.status(200).json(true);

    } catch (err) {
        console.error(error.message);
    }
}

export const updateCard = async (req, res) => {
    try {
        const response = await Card.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        res.status(200).json(await Card.findByPk(req.body.id));
    } catch (error) {
        console.log(error.message);
    }
}

export const getCardById = async (req, res) => {
    try {
        const response = await Card.findAll({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const createCard = async (req, res) => {
    console.log(req.body);
    try {
        const card = await Card.create(req.body);

        io.emit("new card", {
            card
        })

        res.status(201).json(card);
    } catch (error) {
        console.log(error.message);
    }
}
export const addLabel = async (req, res) => {
    console.log(req.body.card_id);
    try {
        Card.findByPk(req.body.card_id).then(card => {
            card.addLabels(req.body.labelId).then(sc => {

                Label.findByPk(req.body.labelId).then(label => {
                    res.status(201).json({
                        cardId: card.id,
                        columnId: card.columnId,
                        label: label
                    });
                })
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}
export const removeLabel = async (req, res) => {
    console.log(req.body.card_id);
    try {
        Card.findByPk(req.body.card_id).then(card => {
            card.removeLabels(req.body.labelId).then(sc => {

                Label.findByPk(req.body.labelId).then(label => {
                    res.status(201).json({
                        cardId: card.id,
                        columnId: card.columnId,
                        label: label
                    });
                })
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}


