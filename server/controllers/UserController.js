import User from "../models/User.js";

import jwt from "jsonwebtoken"
import Project from "../models/Project.js";
import ProjectUser from "../models/ProjectUser.js";
import Notification from "../models/Notification.js";
import Card from "../models/Card.js";
import CardUser from "../models/CardUser.js";
// import CardMember from "../models/CardMember.js";

export const accessTokenSecret = "kalle"


export const addUserToCard = async (req, res) => {

    try {
        const member = await CardUser.create({
            userId: req.body.userId,
            cardId: req.body.cardId
        })

        res.status(200).json(member);

    } catch (error) {
        console.log(error.message);
        res.status(201).send({error: error.name})
    }
}
export const removeUserFromCard = async (req, res) => {
    console.log(req.body)
    try {
        const member = await CardUser.destroy({
            where: {
                userId: req.body.userId,
                cardId: req.body.cardId
            }
        })

        res.status(200).json(member);

    } catch (error) {
        console.log(error.message);
        res.status(201).send({error: error.name})
    }
}
export const resetNotifications = async (req, res) => {
    try {

        await Notification.update({
            status: "Seen"
        }, {
            where: {
                userId: req.user.id
            }
        })

        res.status(200).json(true);

    } catch (error) {
        console.log(error.message);
    }
}

export const getNotifications = async (req, res) => {
    try {

        const response = await Notification.findAll({
            where: {
                userId: req.user.id
            },
            order: [["createdAt", "asc"]],
            include: [
                {
                    model: User,
                    as: "userBy"
                },
                {
                    model: Project
                },
                {
                    model: Card
                }
            ]
        })

        res.status(200).json(response);

    } catch (error) {
        console.log(error.message);
    }
}


export const removeUserFromProject = async (req, res) => {
    try {

        const response = await ProjectUser.destroy({
            where: {
                id: req.body.id,
            }
        })

        // await Notification.create({
        //     userById: req.body.sharedById,
        //     status: "New",
        //     action: "RemovedFromProject",
        //     userId: user ? user.id : null,
        // })

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const addPendingUser = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        const response = await ProjectUser.create({
            email: req.body.email,
            status: "Pending",
            userId: user ? user.id : null,
            projectId: req.body.projectId,
            sharedById: req.body.sharedById,
            role: req.body.role
        })

        await Notification.create({
            userById: req.body.sharedById,
            status: "New",
            action: "AddedToProject",
            userId: user ? user.id : null,
            projectId: req.body.projectId
        })


        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProjects = async (req, res) => {
    try {
        const response = await Project.findAll({
            include: {
                model: User,
                where: {
                    id: req.params.userId
                }
            },
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({
            where: {
                email: username
            },
            include: [
                {
                    model: Notification,
                    as: "notificationUser"
                }
            ]
        })

        if (user) {
            const accessToken = jwt.sign({username: user.name, id: user.id}, accessTokenSecret);
            res.json({
                accessToken,
                user
            });
        } else {
            res.send('Username or password incorrect');
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsers = async (req, res) => {
    try {

        const response = await ProjectUser.findAll({
            where: {
                projectId: req.params.projectId,
            },
            include: [
                {
                    model: User,
                    as: "user"
                }
            ]
        })

        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
