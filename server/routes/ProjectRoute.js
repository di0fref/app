import express from "express";
import {getProjects,getProjectsById, updateProject, updateColumn,addColumn} from "../controllers/ProjectController.js";
const router = express.Router();

router.get('/projects', getProjects);
router.get('/projects/:id', getProjectsById);
router.put('/projects/:id', updateProject);
router.put('/projects/column/:id', updateColumn);
router.post('/projects/column/add', addColumn);
// router.get('/projects/columns/:projectId', getColumns);


// router.post('/users', createUser);
// router.patch('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

export default router;
