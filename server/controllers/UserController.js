import User from "../models/User.js";

import jwt from "jsonwebtoken"
import Project from "../models/Project.js";
import ProjectUser from "../models/ProjectUsers.js";

export const accessTokenSecret = "kalle"


export const removeUserFromProject = async (req, res) => {
    try {

        const response = await ProjectUser.destroy({
            where: {
                userId: req.body.userId,
                projectId: req.body.projectId
            }
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
            }
        })

        if (user) {
            // Generate an access token
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
        const response = await User.findAll({
            include: {
                model: ProjectUser,
                attributes: ["role"],
                where: {
                    // userId: req.user.id,
                    projectId: req.params.projectId
                },
            },
        });
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
