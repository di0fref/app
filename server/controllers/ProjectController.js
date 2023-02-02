import Project from "../models/Project.js";
import Card from "../models/Card.js";
import User from "../models/User.js";
import Column from "../models/Column.js"
import {Sequelize} from "sequelize";
import {Lane} from "react-trello";

export const getProjects = async (req, res) => {
    try {
        const response = await Project.findAll({
            order: [
                ["title", "asc"]
            ],
            include: [
                {
                    model: Card,
                },
                {
                    model: User,
                    where: {
                        id: req.user.id
                    },
                    through: {
                        attributes: []
                    }
                }
            ]
        })

        res.status(200).json(response);
    } catch
        (error) {
        console.log(error.message);
    }
}

export const getProjectsById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: {
                model: Column,
                separate: true,
                order: [
                    ["order", "asc"]
                ],
                include: {
                    model: Card,
                    order: [
                        ["position", "asc"]
                    ],
                    separate: true
                }
            }
        })


        res.status(200).json(project);
    } catch
        (error) {
        console.log(error.message);
    }
}

export const updateColumn = async (req, res) => {
    console.log(req);
    try {
        const response = await Column.update(req.body, {where: {id: req.params.id}});
        res.status(200).json(response);
    } catch
        (error) {
        console.log(error.message);
    }
}
export const addColumn = async (req, res) => {
    console.log(req);
    try {
        const response = await Column.create(req.body, {
            include: Card
        });
        res.status(200).json(response);
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

