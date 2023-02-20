import Card from "../models/Card.js";
import Column from "../models/Column.js";
import {io} from "../server.js"
import Label from "../models/Label.js";
import {Sequelize} from "sequelize";
import db from "../config/Database.js"
import {response} from "express";
import Field from "../models/Field.js";
import CardField from "../models/CardField.js";
import ProjectField from "../models/ProjectField.js";

export const getCards = async (req, res) => {
    try {
        const response = await Card.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const getCardsByIds = async (req, res) => {
    const cards = await Card.findAll({
        where: {
            id: req.body.map(card => card.id)
        }
    })
    res.status(200).json(cards);
}

export const reorderCards = async (req, res) => {
    try {
        Promise.all(
            Object.values(req.body).map(card => {
                Card.update(card, {
                    where: {
                        id: card.id
                    },
                })
            })
        ).then(response => {
            res.status(200).json(true);
        })

    } catch (err) {
        console.error(err.message);
    }
}

export const updateField = async (req, res) => {
    try {
        const cardField = await CardField.update(req.body, {
            where: {
                id: req.body.id
            }
        })

        res.status(200).json(await CardField.findOne({
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: Card,
                    attributes: ["id", "columnId"]
                }
            ]
        }))

    } catch (error) {
        console.log(error.message);
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

    const cards = await db.query("update cards set position = position + 1 where columnId = '" + req.body.columnId + "'")

    try {
        const newCard = await Card.create({
            ...req.body,
            position: 0,
        });

        /* Create the fields */
        const projectFields = await ProjectField.findAll({
            where: {
                projectId: req.body.projectId
            }
        })

        await Promise.all(
            Object.values(projectFields).map(async projectField => {
                await CardField.create({
                    cardId: newCard.id,
                    name: projectField.title,
                    projectFieldId: projectField.id
                })
            })
        ).then(result => {

            Card.findByPk(newCard.id, {
                include: [
                    {
                        model: Column,
                        attributes: ["title"],
                    },
                    {
                        model: Label,
                        attributes: ["title", "id", "color"],
                    },
                    {
                        model: CardField
                    }
                ],
            }).then(card => {
                io.emit("new card", {
                    card
                })
                res.status(201).json(card);
            })
        })
    } catch (error) {
        console.log(error.message);
    }
}
export const addLabel = async (req, res) => {
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

export const archiveCards = async (req, res) => {

    try {
        await Promise.all(
            req.body.map(async cardId => {
                Card.update({status: "archived"}, {
                    where: {
                        id: cardId
                    },
                })
            })
        )
        res.status(201).json(req.body);

    } catch (error) {
        console.log(error.message);
    }
}