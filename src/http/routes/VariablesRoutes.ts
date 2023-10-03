import { Router } from 'express'
import { ApplyUseCase } from '../middlewares/ApplyUseCase';
import MainVariables from '../../app/usecases/variables/functions/MainVariables';
const router = Router()
const mainVariables = new MainVariables()

router.post("/create", (req, res) => { ApplyUseCase(res, mainVariables.CreateVar, req.query, req.body) })//tested
router.get("/find", (req, res) => { ApplyUseCase(res, mainVariables.FindVar, req.query, req.body) })//tested
router.get("/list", (req, res) => { ApplyUseCase(res, mainVariables.ListVar, req.query, req.body) })//tested
router.patch("/update", (req, res) => { ApplyUseCase(res, mainVariables.UpdateVar, req.query, req.body) })//tested
router.delete("/delete", (req, res) => { ApplyUseCase(res, mainVariables.DeleteVar, req.query, req.body) })//tested

export default router