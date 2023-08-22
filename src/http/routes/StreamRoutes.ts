import { Router } from 'express'
//import { verifyToken } from '../../authentication/JWT';
import MainUsecaseStream from '../../app/usecases/Streams/functions/MainUsecaseStream';
import { ApplyUseCase } from '../middlewares/ApplyUseCase';


const router = Router()

const MainStream = new MainUsecaseStream()
router.post("/create-stream", (req, res) => { ApplyUseCase(res, MainStream.CreateNewStream), req.query, req.body })
router.get("/find-stream", (req, res) => { ApplyUseCase(res, MainStream.GetStreamById), req.query, req.body })
router.patch("/update-stream", (req, res) => { ApplyUseCase(res, MainStream.UpdateStreamById), req.query, req.body })
router.delete("/delete-stream", (req, res) => { ApplyUseCase(res, MainStream.DeleteStreamById), req.query, req.body })



export default router;