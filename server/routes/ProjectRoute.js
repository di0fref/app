import express from "express";
import {getProjects,getProjectsById} from "../controllers/ProjectController.js";
const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectsById);
// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
