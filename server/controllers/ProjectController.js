import Project from "../models/Project.js";
import Card from "../models/Card.js";
import User from "../models/User.js";

export const getProjects = async (req, res) => {
    console.log(req.user);
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
        ;
        res.status(200).json(response);
    } catch
        (error) {
        console.log(error.message);
    }
}

export const getProjectsById = async (req, res) => {
    try {
        const response = await Project.findByPk(req.params.id, {
                include: Card
            })
        ;
        res.status(200).json(response);
    } catch
        (error) {
        console.log(error.message);
    }
}