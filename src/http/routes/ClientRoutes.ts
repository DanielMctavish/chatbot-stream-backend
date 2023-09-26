import { Router } from 'express'
//import { verifyToken } from '../../authentication/JWT';
import MainClient from '../../app/usecases/clients/functions/MainClient';
import { ApplyUseCase } from '../middlewares/ApplyUseCase';


const router = Router()
const mainClient = new MainClient()

router.post("/create", (req, res) => { ApplyUseCase(res, mainClient.AddClient, req.query, req.body) })
router.delete("/delete", (req, res) => { ApplyUseCase(res, mainClient.DeleteClient, req.query, req.body) })


export default router;