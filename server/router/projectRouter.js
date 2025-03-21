
import express from "express"
import { addProject, deleteProjects, getProject, getProjects, updateProjects } from "../controller/projectController.js"
import { verifyToken } from "../utils/verify.js"



const projectRouter = express.Router()


projectRouter.post('/add-project', verifyToken ,addProject)


projectRouter.get('/get-project/:projectId', getProject)


projectRouter.get('/get-projects',verifyToken, getProjects)


projectRouter.put(`/update-project/:projectId`,verifyToken, updateProjects)


projectRouter.delete(`/delete-project/:projectId`,verifyToken, deleteProjects)



export default projectRouter
