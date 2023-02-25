import Project from "../models/Project.js";
import Card from "../models/Card.js";
import User from "../models/User.js";
import Column from "../models/Column.js"
import {Sequelize, Op} from "sequelize";
import {Lane} from "react-trello";
import Label from "../models/Label.js";
import db from "../config/Database.js"
import ProjectField from "../models/ProjectField.js";
import CardField from "../models/CardField.js";
import Log from "../models/Log.js"
import Checklist from "../models/Checklist.js"
import ChecklistItem from "../models/ChecklistItem.js";

export const getProjects = async (req, res) => {
    try {
        const response = await Project.findAll({
            include: {
                model: User,
                where: {
                    id: req.user.id
                }
            },
            where: {}
        })

        res.status(200).json(response);
    } catch
        (error) {
        console.log(error.message);
    }
}


export const addField = async (req, res) => {
    try {
        const projectField = await ProjectField.create(req.body)
        /* All cards need to have this field */
        const cards = await Card.findAll(
            {
                where: {
                    projectId: req.body.projectId
                }
            });
        Promise.all(
            Object.values(cards).map(card => {
                CardField.create({
                    cardId: card.id,
                    name: req.body.title,
                    value: null,
                    projectFieldId: projectField.id
                })
            })
        ).then(res2 => {
            res.status(200).json(projectField);
        })

    } catch
        (error) {
        console.log(error.message);
    }
}

export const getFilteredProjectById = async (req, res) => {

    console.log(req.body)

    const labelWhere = req.body.labels.length ? {id: req.body.labels.map(label => label)} : null

    const dueWhere = req.body.due.length ?
        {
                due: req.body.due.map(due => due)
        }
        : null

    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
                {
                    model: Label
                },
                {
                    model: ProjectField
                },
                {
                    model: Column,
                    order: [["order", "asc"]],
                    separate: true,
                    include: [
                        {
                            model: Card,
                            order: [["position", "asc"]],
                            separate: true,
                            required: false,
                            where: dueWhere,
                            include: [
                                {
                                    model: Checklist,
                                    include: [{
                                        model: ChecklistItem,
                                        order: [["createdAt", "asc"]],
                                        separate: true
                                    }]
                                },
                                {
                                    model: Label,
                                    attributes: ["title", "id", "color"],
                                    order: [["title", "asc"]],
                                    where: labelWhere
                                }, {
                                    model: Column,
                                    attributes: ["title"],
                                },
                                {
                                    model: CardField,
                                    order: [["name", "asc"]],
                                    separate: true,
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        res.status(200).json(project);
    } catch
        (error) {
        console.log(error.message);
    }
}

export const getProjectsById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
                {
                    model: Label
                },
                {
                    model: ProjectField
                },
                {
                    model: Column,
                    order: [["order", "asc"]],
                    separate: true,
                    include: [
                        {
                            model: Card,
                            order: [["position", "asc"]],
                            separate: true,
                            required: false,
                            // where: {
                            //     status: {
                            //         [Op.ne]: "archived",
                            //     }
                            // },
                            include: [
                                {
                                    model: Checklist,
                                    include: [{
                                        model: ChecklistItem,
                                        order: [["createdAt", "asc"]],
                                        separate: true
                                    }]
                                },
                                {
                                    model: Label,
                                    attributes: ["title", "id", "color"],
                                    order: [["title", "asc"]],
                                }, {
                                    model: Column,
                                    attributes: ["title"],
                                },
                                {
                                    model: CardField,
                                    order: [["name", "asc"]],
                                    separate: true,
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        res.status(200).json(project);
    } catch
        (error) {
        console.log(error.message);
    }
}

export const updateColumn = async (req, res) => {
    try {
        const response = await Column.update(req.body, {where: {id: req.params.id}});
        res.status(200).json(response);
    } catch
        (error) {
        console.log(error.message);
    }
}
export const addColumn = async (req, res) => {

    const maxOrder = await Column.findOne({
        attributes: [[Sequelize.fn('max', Sequelize.col('order')), 'maxOrder']],
        raw: true
    })

    try {
        const col = await Column.create({
            ...req.body,
            order: maxOrder.maxOrder + 1
        })


        const newCol = await Column.findByPk(col.id, {
            include: Card
        })

        res.status(200).json(newCol);
    } catch
        (error) {
        console.log(error.message);
    }
}
export const createProject = async (req, res) => {
    try {
        const project = await Project.create({
            title: req.body.title,
        })
        project.addUsers(req.user.id)

        /* Create default columns */
        const colBacklog = await Column.create({
            title: "Backlog",
            projectId: project.id
        })

        const colStarted = await Column.create({
            title: "Started",
            projectId: project.id
        })

        const colDone = await Column.create({
            title: "Done",
            projectId: project.id
        })

        res.status(200).json(project);

    } catch
        (error) {
        console.log(error.message);
    }
}

export const updateProject = async (req, res) => {
    try {

    } catch
        (error) {
        console.log(error.message);
    }
}


export const getLog = async (req, res) => {
    try {
        const log = await Log.findAll({
            where: {
                projectId: req.params.id
            },
            limit: 20,
            include: [User, Column, Card]
        })
        res.status(200).json(log);

    } catch
        (error) {
        console.log(error.message);
    }
}
