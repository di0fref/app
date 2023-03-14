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
import _ from "lodash"
import Log from "../models/Log.js"
import Checklist from "../models/Checklist.js";
import ChecklistItem from "../models/ChecklistItem.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";


export const uploadFile = async (req, res) => {
    try {


    } catch (error) {
        console.log(error.message);
    }
}
export const addComment = async (req, res) => {
    try {

        const comment = await Comment.create(
            {
                ...req.body,
                userId: req.user.id
            })

        res.status(200).json(await Comment.findByPk(comment.id, {
            include: [User, Card]
        }));

    } catch (error) {
        console.log(error.message);
    }
}
export const deleteComment = async (req, res) => {
    try {

        const comment = await Comment.findByPk(req.body.id, {
            include: [Card]
        })

        // const del = await Comment.destroy({
        //     where:{
        //         id: req.body.id
        //     }
        // })

        res.status(200).json(comment);

    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCard = async (req, res) => {
    try {

        const response = await Card.findByPk(req.params.id)

        await Log.destroy({
            where: {
                cardId: req.params.id
            }
        })

        await Card.destroy({
            where: {
                id: req.params.id
            }
        });


        /* Delete */
        // Fields
        // Checklist
        // ChecklistItem
        // Comments
        // Labels


        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const getCards = async (req, res) => {
    try {
        const response = await Card.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getCard = async (req, res) => {

    try {
        const response = await Card.findByPk(req.params.id, {
            include: [
                {
                    model: Label,
                    attributes: ["title", "id", "color"],
                    order: [["title", "asc"]],
                    // separate: true
                }, {
                    model: Column,
                    attributes: ["title"],
                },
                {
                    model: CardField,
                    order: [["name", "asc"]],
                    separate: true,
                    include: [{
                        model: ProjectField,
                        attributes: ["options", "type", "id"]
                    }]
                },
                {
                    model: Checklist,
                    include: [
                        {
                            model: ChecklistItem,
                            order: [["createdAt", "asc"]],
                            separate: true
                        },
                    ]
                },
                {
                    model: User,
                },
                {
                    model: Log,
                    separate: true,
                    order: [["createdAt", "desc"]],
                    include: [
                        {
                            model: User,
                            attributes: ["name", "id", "image"]
                        }
                    ]
                }
            ]
        });
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
            Object.values(req.body).map(async card => {

                const originalObj = await Card.findByPk(card.id)

                if (originalObj.columnId != card.columnId) {

                    const oldColumn = await Column.findByPk(originalObj.columnId)
                    const newColumn = await Column.findByPk(card.columnId)

                    await Log.create({
                        userId: req.user.id,
                        field: "columnId",
                        value: card.columnId,
                        action: "moved this card from " + oldColumn.title + " to " + newColumn.title,
                        cardId: card.id,
                        projectId: originalObj.projectId,
                        columnId: card.columnId
                    })
                }
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
        const field = await CardField.findOne({
            where: {
                id: req.body.id
            },
            include: [
                {
                    model: Card,
                    attributes: ["id", "columnId"]
                }
            ]
        })

        const log = await Log.create({
            cardId: req.body.cardId,
            userId: req.user.id,
            action: "updated field " + field.name + " to " + field.value
        })


        res.status(200).json(field)

    } catch (error) {
        console.log(error.message);
    }
}

export const updateCard = async (req, res) => {
    try {

        const originalObj = await Card.findByPk(req.body.id)
        const changes = _.pickBy(req.body, (v, k) => !_.isEqual(originalObj[k], v))

        Object.entries(changes).map(([key, val]) => {
            console.log(key, val)
            let action = ""
            let log = false;

            switch (key) {
                case "status":
                    if (val === "Archived") {
                        action = "archived this card"
                    } else {
                        action = "sent this card to the board"
                    }
                    log = true
                    break;
                case "due":
                    action = "changed due date to " + req.body.due
                    log = true
                    break;
            }

            if (log) {
                Log.create({
                    userId: req.user.id,
                    field: "Card",
                    action: action,
                    module: "Card",
                    // name: originalObj.title,
                    cardId: originalObj.id,
                    projectId: originalObj.projectId,
                })
            }

        })
        /* Audit on */
        /*
            Move
            Archive
            Unarchive
            Due
            Delete
            Added user
            Deleted user
        */

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

        Log.create({
            userId: req.user.id,
            field: "Card",
            action: "created this card",
            module: "Card",
            // name: originalObj.title,
            cardId: newCard.id,
            projectId: newCard.projectId,
        })

        await Promise.all(
            Object.values(projectFields).map(async projectField => {
                await CardField.create({
                    cardId: newCard.id,
                    name: projectField.title,
                    projectFieldId: projectField.id,
                    type: projectField.type,
                    options: projectField.options
                })
            })
        ).then(result => {
            Card.findByPk(newCard.id, {
                    include: [
                        {
                            model: Label,
                            attributes: ["title", "id", "color"],
                            order: [["title", "asc"]],
                            // separate: true
                        }, {
                            model: Column,
                            attributes: ["title"],
                        },
                        {
                            model: Comment,
                            order: [["createdAt", "asc"]],
                            separate: true,
                            include: [User]
                        },
                        {
                            model: CardField,
                            order: [["name", "asc"]],
                            separate: true,
                            include: [{
                                model: ProjectField,
                                attributes: ["options", "type", "id"]
                            }]
                        },
                        {
                            model: Checklist,
                            include: [
                                {
                                    model: ChecklistItem,
                                    order: [["createdAt", "asc"]],
                                    separate: true
                                },
                            ]
                        },
                        {
                            model: User,
                        },
                        {
                            model: Log,
                            separate: true,
                            order: [["createdAt", "desc"]],
                            include: [
                                {
                                    model: User,
                                    attributes: ["name", "id", "image"]
                                }
                            ]
                        }
                    ]
                }
            ).then(card => {
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

