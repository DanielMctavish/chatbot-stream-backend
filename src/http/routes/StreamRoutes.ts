import { Router } from 'express'
//import { verifyToken } from '../../authentication/JWT';
import MainUsecaseStream from '../../app/usecases/Streams/functions/MainUsecaseStream';
import { ApplyUseCase } from '../middlewares/ApplyUseCase';


const router = Router()

const MainStream = new MainUsecaseStream()
router.post("/create", (req, res) => { ApplyUseCase(res, MainStream.CreateNewStream, req.query, req.body) })
router.get("/find", (req, res) => { ApplyUseCase(res, MainStream.GetStreamById, req.query, req.body) })
router.get("/find-all", (req, res) => { ApplyUseCase(res, MainStream.FindAllStreams, req.query, req.body) })
router.patch("/update", (req, res) => { ApplyUseCase(res, MainStream.UpdateStreamById, req.query, req.body) })
router.patch("/set-stream", (req, res) => { ApplyUseCase(res, MainStream.SetStream, req.query, req.body) })//
router.delete("/delete", (req, res) => { ApplyUseCase(res, MainStream.DeleteStreamById, req.query, req.body) })

router.post("/set-default-stream", (req, res) => { ApplyUseCase(res, MainStream.SetDefaultStream, req.query, req.body) })


export default router;