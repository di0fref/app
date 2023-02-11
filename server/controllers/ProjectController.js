import Project from "../models/Project.js";
import Card from "../models/Card.js";
import User from "../models/User.js";
import Column from "../models/Column.js"
import {Sequelize} from "sequelize";
import {Lane} from "react-trello";
import Label from "../models/Label.js";
import db from "../config/Database.js"

export const getProjects = async (req, res) => {

    console.log(req.user)
    try {
        const response = await Project.findAll()

        res.status(200).json(response);
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
                    model: Column,
                    order: [["order", "asc"]],
                    separate: true,
                    include: {
                        model: Card,
                        order: [["position", "asc"]],
                        include: [
                            {
                                model: Column,
                                attributes: ["title"],
                            },
                            {
                                model: Label,
                                attributes: ["title", "id", "color"],
                            }
                        ],
                        separate: true
                    }
                }]
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
            order: maxOrder.maxOrder+1
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


export const updateProject = async (req, res) => {
    try {

    } catch
        (error) {
        console.log(error.message);
    }
}

