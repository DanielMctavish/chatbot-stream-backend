import { Router } from 'express'
import { ApplyUseCase } from '../middlewares/ApplyUseCase';
import loginInstance from '../../app/usecases/access/MainLogin';

const router = Router()


router.post("/login", (req, res) => { ApplyUseCase(res, loginInstance.LoginAdmin, req.query, req.body) })

export default router;